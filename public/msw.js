/* eslint-disable */
/* tslint:disable */

/** Mock Service Worker (2.2.2).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '223d191a56023cd36aa88c802961b911'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientRuns = new Map()
const activeClientIds = new Set()


self.addEventListener('install', async function (event) {
  self.skipWaiting()
})

self.addEventListener('activate', async function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !self.clients) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data) {
    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      activeClientRuns.delete(clientId)
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)
      activeClientRuns.get(clientId)?.resolve()

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)
      activeClientRuns.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', async function (event) {
  const request = event.request
  const headers = request.headers
  const clientId = event.clientId

  if (!clientId) {
    delete headers['x-msw']
    return
  }

  if (!headers.get('x-msw')) {
    return
  }

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  if (!activeClientIds.has(clientId) && headers.get('x-msw') === 'force') {
    if (!activeClientRuns.has(clientId)) {
      let promiser = null
      let resolver = null
      
      promiser = new Promise((resolve) => {
        resolver = resolve
      })
      
      activeClientRuns.set(clientId, {
        promise: promiser,
        resolve: resolver
      })
    }

    const uuid = crypto.randomUUID()
    const promise = activeClientRuns.get(clientId).promise
    return event.respondWith(promise.then(() => handleRequest(event, uuid)))
  }

  if (activeClientIds.has(clientId)) {
    event.respondWith(handleRequest(event, crypto.randomUUID()))
  }
})


async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId)
  const clients = await self.clients.matchAll({ type: 'window' })

  if (client?.frameType === 'top-level') {
    return client
  }

  return clients
    .filter((client) => client.visibilityState === 'visible')
    .find((client) => activeClientIds.has(client.id))
}

async function respondWithMock(response) {
  if (response.status === 0) {
    return Response.error()
  }

  const mockedResponse = new Response(response.body, response)

  Reflect.defineProperty(mockedResponse, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })

  return mockedResponse
}

async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event)
  const response = await getResponse(event, client, requestId)

  if (client && activeClientIds.has(client.id)) {
    ;(async function () {
      const responseClone = response.clone()

      sendToClient(
        client,
        {
          type: 'RESPONSE',
          payload: {
            requestId,
            isMockedResponse: IS_MOCKED_RESPONSE in response,
            type: responseClone.type,
            status: responseClone.status,
            statusText: responseClone.statusText,
            body: responseClone.body,
            headers: Object.fromEntries(responseClone.headers.entries()),
          },
        },
        [responseClone.body],
      )
    })()
  }

  return response
}

async function getResponse(event, client, requestId) {
  const request = event.request
  const requestClone = request.clone()

  function passthrough() {
    const headers = Object.fromEntries(requestClone.headers.entries())

    delete headers['x-msw-intention']
    delete headers['x-msw']

    return fetch(requestClone, { headers })
  }

  if (!client) {
    return passthrough()
  }

  if (!activeClientIds.has(client.id)) {
    return passthrough()
  }

  const mswIntention = request.headers.get('x-msw-intention')

  if (['bypass', 'passthrough'].includes(mswIntention)) {
    return passthrough()
  }

  const requestBuffer = await request.arrayBuffer()
  const clientMessage = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: request.url,
        mode: request.mode,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        cache: request.cache,
        credentials: request.credentials,
        destination: request.destination,
        integrity: request.integrity,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body: requestBuffer,
        keepalive: request.keepalive,
      },
    },
    [requestBuffer],
  )

  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data)
    }

    case 'MOCK_NOT_FOUND': {
      return passthrough()
    }
  }

  return passthrough()
}

async function sendToClient(client, message, transfers = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(
      message,
      [channel.port2].concat(transfers.filter(Boolean)),
    )
  })
}
