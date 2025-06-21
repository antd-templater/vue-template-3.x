/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker.
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 */

const PACKAGE_VERSION = '2.10.2'
const INTEGRITY_CHECKSUM = 'f5825c521429caf22a4dd13b66e243af'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()


addEventListener('install', function () {
  self.skipWaiting()
})

addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

addEventListener('message', async function (event) {
  const clientId = Reflect.get(event.source || {}, 'id')

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
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: {
          packageVersion: PACKAGE_VERSION,
          checksum: INTEGRITY_CHECKSUM,
        },
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: {
          client: {
            id: client.id,
            frameType: client.frameType,
          },
        },
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

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

addEventListener('fetch', async function (event) {
  const request = event.request
  const clientId = event.clientId
  const _request = request.clone()
  const requester = request.headers.get('x-msw-requester')
  const requestId = crypto.randomUUID()

  if (!requester) {
    return
  }

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  const passthrough = async () => {
    const headers = new Headers(_request.headers)
    const xMswHeader = headers.get('x-msw-requester')
    const acceptHeader = headers.get('accept')

    if (xMswHeader) {
      const values = xMswHeader.split(',').map((value) => value.trim())
      const filters = values.filter((value) => value !== 'Axios')
     
      filters.length > 0
        ? headers.set('x-msw-requester', filters.join(', '))
        : headers.delete('x-msw-requester')
    }

    if (acceptHeader) {
      const values = acceptHeader.split(',').map((value) => value.trim())
      const filters = values.filter((value) => value !== 'msw/passthrough')
     
      filters.length > 0
        ? headers.set('accept', filters.join(', '))
        : headers.delete('accept')
    }

    return fetch(_request, { 
      headers 
    })
  }

  const responser = async () => {
    if (!activeClientIds.has(clientId)) {
      await new Promise((resolve) => setTimeout(resolve, 180))
    }

    if (!activeClientIds.has(clientId)) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (activeClientIds.has(clientId)) {
      return handleRequest(event, requestId)
    }

    return passthrough()
  }

  event.respondWith(responser())
})



async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId)

  if (activeClientIds.has(event.clientId)) {
    return client
  }

  if (client?.frameType === 'top-level') {
    return client
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  return allClients
    .filter((client) => client.visibilityState === 'visible')
    .find((client) => activeClientIds.has(client.id))
}

async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event)
  const response = await getResponse(event, client, requestId)

  if (client && activeClientIds.has(client.id)) {
    const request = event.request
    const requestClone = request.clone()
    const responseClone = response.clone()
    const serializedRequest = await serializeRequest(requestClone)

    sendToClient(
      client,
      {
        type: 'RESPONSE',
        payload: {
          isMockedResponse: IS_MOCKED_RESPONSE in response,
          request: {
            id: requestId,
            ...serializedRequest,
          },
          response: {
            type: responseClone.type,
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: Object.fromEntries(responseClone.headers.entries()),
            body: responseClone.body,
          },
        },
      },
      responseClone.body ? [serializedRequest.body, responseClone.body] : [],
    )
  }

  return response
}

async function getResponse(event, client, requestId) {
  const request = event.request
  const requestClone = request.clone()

  function passthrough() {
    const headers = Object.fromEntries(requestClone.headers.entries())
    const request = fetch(requestClone, { headers })

    delete headers['x-msw-requester']
    delete headers['x-msw-intention']

    return request
  }

  if (!client) {
    return passthrough()
  }

  if (!activeClientIds.has(client.id)) {
    return passthrough()
  }

  const serializedRequest = await serializeRequest(request.clone())
  const clientMessage = await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        ...serializedRequest,
      },
    },
    [serializedRequest.body],
  )

  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data)
    }

    case 'PASSTHROUGH': {
      return passthrough()
    }
  }

  return passthrough()
}

async function sendToClient(client, message, transferrables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(message, [
      channel.port2,
      ...transferrables.filter(Boolean),
    ])
  })
}

async function serializeRequest(request) {
  return {
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
    body: await request.arrayBuffer(),
    keepalive: request.keepalive,
  }
}

function respondWithMock(response) {
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
