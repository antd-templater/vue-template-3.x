import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'UserLayout',
  setup() {
    return () => (
      <div
        class="user-layout-wrapper"
        style="width: 100%; height: 100%"
      >
        <div
          class="container"
          style="width: 100%; height: 100%; background-size: 100%; background-repeat: no-repeat; position: relative;"
        >
          <RouterView />
        </div>
      </div>
    )
  },
})
