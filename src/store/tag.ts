import { defineStore } from 'pinia'
import { Ref, ref, readonly } from 'vue'
import useAppStore from '@/store/app'

/**
 * 类型声明
 */
type Meta = {
  title: string;
  match: string;
  external: string;
  componentName: string;
  allowCache: boolean;
}

type Route = {
  meta: Meta;
  name: string;
  path: string;
  title: string;
  fullPath: string;
  query?: Record<string, any>;
  params?: Record<string, any>;
  matched?: Array<Matched>;
}

type Matched = {
  path: string;
  name: string;
  meta: Meta;
}

type Strings = string[]

/**
 * Tag 标签页管理
 */
export default defineStore('tag', () => {
  const currentTag: Ref<Route | null> = ref(null)
  const stackTags: Ref<Route[]> = ref([])
  const visitTags: Ref<Route[]> = ref([])

  const cacheTags: Ref<Strings> = ref([
    'BasicLayout',
    'RouteView',
    'PageFrame',
    'PageView',
  ])

  const clone = (tag: Route): Route => {
    return Object.assign({}, {
      fullPath: tag.fullPath,
      path: tag.path,
      meta: tag.meta,
      name: tag.name,
      query: tag.query,
      params: tag.params,
      title: tag.meta.title || '未定义',
      matched: tag.matched?.map(tag => ({
        path: tag.path,
        name: tag.name,
        meta: tag.meta,
      })),
    })
  }

  const addTags = (tags: Route | Route[]) => {
    addVisitTags(tags)
    addCacheTags(tags)

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const addVisitTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? tags : [tags]
    tags = Array.from(new Set(tags))

    tags.forEach(tag => {
      const stackTag = stackTags.value.find(stack => stack.fullPath === tag.fullPath)
      const visitTag = visitTags.value.find(visit => visit.fullPath === tag.fullPath)

      if (stackTag) {
        stackTags.value.splice(stackTags.value.indexOf(stackTag), 1)
        stackTags.value.unshift(stackTag)
      }

      if (!stackTag) {
        stackTags.value.unshift(clone(tag))
      }

      if (!visitTag) {
        currentTag.value = clone(tag)
        visitTags.value.push(currentTag.value)
      }

      if (visitTag) {
        currentTag.value = visitTag
      }
    })

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const addCacheTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? tags : [tags]
    tags = Array.from(new Set(tags))

    tags.forEach(tag => {
      const tagName = tag.meta.componentName
      const keepAlive = useAppStore().keepAlive
      const allowCache = tag.meta.allowCache !== false

      if (keepAlive && allowCache && tagName && !cacheTags.value.includes(tagName)) {
        cacheTags.value.push(tagName)
      }
    })

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const updateVisitTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? tags : [tags]
    tags = Array.from(new Set(tags))

    tags.forEach(tag => {
      for (const stack of stackTags.value) {
        if (stack.fullPath === tag.fullPath) {
          Object.assign(stack, clone(tag))
          break
        }
      }

      for (const visit of visitTags.value) {
        if (visit.fullPath === tag.fullPath) {
          Object.assign(visit, clone(tag))
          break
        }
      }
    })

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const updateCacheTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? tags : [tags]
    tags = Array.from(new Set(tags))

    tags.forEach(tag => {
      const tagName = tag.meta.componentName
      const keepAlive = useAppStore().keepAlive
      const allowCache = tag.meta.allowCache !== false

      if (!visitTags.value.some(visit => visit.fullPath === tag.fullPath)) {
        cacheTags.value = cacheTags.value.filter(name => name !== tag.meta.componentName)
        return
      }

      if (keepAlive && allowCache && tagName && !cacheTags.value.includes(tagName)) {
        cacheTags.value.push(tagName)
      }
    })

    cacheTags.value = Array.from(
      new Set([
        ...cacheTags.value,
        'BasicLayout',
        'RouteView',
        'PageFrame',
        'PageView',
      ]),
    )

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delTags = (tags: Route | Route[]) => {
    delVisitTags(tags)
    delCacheTags(tags)

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delVisitTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? Array.from(new Set(tags)) : Array.from(new Set([tags]))

    stackTags.value = stackTags.value.filter(stack => !tags.some(tag => stack.fullPath === tag.fullPath))
    visitTags.value = visitTags.value.filter(visit => !tags.some(tag => visit.fullPath === tag.fullPath))

    if (!currentTag.value || !stackTags.value.includes(currentTag.value)) {
      currentTag.value = stackTags.value[0] || null
    }

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delCacheTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? Array.from(new Set(tags)) : Array.from(new Set([tags]))

    cacheTags.value = cacheTags.value.filter(name => !tags.some(tag => name === tag.meta.componentName))
    cacheTags.value = Array.from(new Set([...cacheTags.value, 'BasicLayout', 'RouteView', 'PageFrame', 'PageView']))

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delOtherTags = (tags: Route | Route[]) => {
    delOtherVisitTags(tags)
    delOtherCacheTags(tags)

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delOtherVisitTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? Array.from(new Set(tags)) : Array.from(new Set([tags]))

    stackTags.value = stackTags.value.filter(stack => tags.some(tag => stack.fullPath === tag.fullPath))
    visitTags.value = visitTags.value.filter(visit => tags.some(tag => visit.fullPath === tag.fullPath))

    if (!currentTag.value || !stackTags.value.includes(currentTag.value)) {
      currentTag.value = stackTags.value[0] || null
    }

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delOtherCacheTags = (tags: Route | Route[]) => {
    tags = Array.isArray(tags) ? Array.from(new Set(tags)) : Array.from(new Set([tags]))

    cacheTags.value = cacheTags.value.filter(name => tags.some(tag => name === tag.meta.componentName))
    cacheTags.value = Array.from(new Set([...cacheTags.value, 'BasicLayout', 'RouteView', 'PageFrame', 'PageView']))

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delAllTags = () => {
    delAllVisitTags()
    delAllCacheTags()

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delAllVisitTags = () => {
    stackTags.value = []
    visitTags.value = []
    currentTag.value = null

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delAllCacheTags = () => {
    cacheTags.value = ['BasicLayout', 'RouteView', 'PageFrame', 'PageView']

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  const delCurrentTag = () => {
    if (currentTag.value) {
      delVisitTags(currentTag.value)
      delCacheTags(currentTag.value)
      updateCacheTags(currentTag.value)
    }

    return {
      stackTags: readonly(stackTags),
      visitTags: readonly(visitTags),
      cacheTags: readonly(cacheTags),
    }
  }

  return {
    stackTags,
    visitTags,
    cacheTags,
    currentTag,

    addTags,
    addVisitTags,
    addCacheTags,
    updateVisitTags,
    updateCacheTags,

    delTags,
    delVisitTags,
    delCacheTags,

    delOtherTags,
    delOtherVisitTags,
    delOtherCacheTags,

    delAllTags,
    delAllVisitTags,
    delAllCacheTags,
    delCurrentTag,
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        key: 'STORE-STACK-TAGS',
        paths: ['stackTags'],
      },
      {
        storage: sessionStorage,
        key: 'STORE-VISIT-TAGS',
        paths: ['visitTags'],
      },
    ],
  },
})
