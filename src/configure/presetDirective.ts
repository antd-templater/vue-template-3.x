import { App } from 'vue'
import router from '@/router'
import useUserStore from '@/store/user'

/**
 * @Action 按钮权限: v-action
 */
export default (app: App) => {
  app.directive('action', {
    created: async(el, binding) => {
      const action = binding.arg!
      const userRole = toRaw(useUserStore().userRole)
      const permissions = router.currentRoute.value.meta.permission
      const permissionIds = Array.isArray(permissions) ? permissions : [permissions]

      for (const p of userRole.permissions) {
        if (!permissionIds || !permissionIds.length) {
          return
        }

        if (!permissionIds.includes(p.permissionId)) {
          continue
        }

        if (!p.actionList || !p.actionList.includes(action)) {
          if (!el.parentNode || !el.parentNode.removeChild(el)) {
            el.style.display = 'none'
          }
        }

        return
      }
    },
  })
}
