import { KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import { extractLink } from '@/utils/router'
import useAppStore from '@/store/app'
import useTagStore from '@/store/tag'

export default defineComponent({
  name: 'RouteView',
  setup() {
    const tagStore = useTagStore()
    const appStore = useAppStore()

    const key = computed(() => {
      const route = useRoute()
      const meta = route.meta || {}
      const match = meta.match || 'path'
      return match !== 'external' ? route.fullPath : extractLink(route as any)
    })

    return () => (
      <div class='route-view-container'>
        <RouterView
          v-slots={{
            default: (scope: any) => (
              <KeepAlive include={appStore.multiTab && appStore.keepAlive ? tagStore.cacheTags : []}>
                { scope.Component ? <scope.Component key={key.value}/> : null }
              </KeepAlive>
            )
          }}
        />
      </div>
    )
  }
})
