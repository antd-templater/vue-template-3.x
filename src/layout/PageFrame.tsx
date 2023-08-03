import { extractLink } from '@/utils/router'
import ASpin from 'ant-design-vue/es/spin'
import useAppStore from '@/store/app'

import 'ant-design-vue/es/spin/style/index.less'
import '@/layout/PageFrame.less'

export default defineComponent({
  name: 'PageFrame',
  setup() {
    const route = useRoute()
    const appStore = useAppStore()
    const iframeSource = extractLink(route as any)
    const loading = ref<boolean>(true)
    const iframe = ref<any>(null)

    onMounted(() => {
      if (iframe.value) {
        iframe.value.onload = () => { loading.value = false }
      }
      setTimeout(() => { loading.value = false }, 10000)
    })

    return () => (
      <div
        class='page-frame-container'
        style={{
          width: '100%',
          height: (appStore.isMixMenu && !appStore.hideMixHeaderTab || appStore.fixedHeader) && appStore.fixedHeaderTab ? 'calc(100vh - 88px)' : (appStore.isMixMenu || appStore.fixedHeader) ? 'calc(100vh - 50px)' : '100vh',
          margin: '0',
          padding: '0.5px',
          position: 'absolute',
          boxSizing: 'border-box'
        }}
      >
        <ASpin
          size='large'
          tip='正在加载访问中...'
          wrapperClassName='ant-spin-wrapper'
          spinning={loading.value}
        >
          <iframe
            ref={iframe}
            width='100%'
            height='100%'
            scrolling='yes'
            frameborder='0'
            src={iframeSource}
          />
        </ASpin>
      </div>
    )
  }
})
