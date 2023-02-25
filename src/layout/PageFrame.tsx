import ASpin from 'ant-design-vue/es/spin'
import { extractLink } from '@/utils/router'

import 'ant-design-vue/es/spin/style/index.less'
import '@/layout/PageFrame.less'

export default defineComponent({
  name: 'PageFrame',
  setup() {
    const route = useRoute()
    const iframe = ref<any>(null)
    const loading = ref<boolean>(true)
    const iframeSource = extractLink(route as any)

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
          height: '100%',
          margin: '0',
          padding: '0.5px',
          position: 'relative',
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
