import { App, createVNode, isVNode, render } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import ConfirmDialog from 'ant-design-vue/es/modal/ConfirmDialog'
import AModal, { ModalFuncProps } from 'ant-design-vue/es/modal'

/**
 * @Magic Fix the issue
 */
export default (_: App) => {
  /**
   * fix Modal.confirm not closed bug in vue3.4
   */
  Object.assign(AModal, {
    confirm: (options: ModalFuncProps) => {
      const element = document.createDocumentFragment() as any

      const dialog = createVNode(ConfirmDialog, {
        ...options,
        visible: true,
        type: 'confirm',
        prefixCls: 'ant-modal',
        rootPrefixCls: 'ant',
        contentPrefixCls: 'ant-modal-confirm',
        icon: isVNode(options.icon) ? options.icon : createVNode(ExclamationCircleOutlined),
        onCancel: async(...rest: any[]) => {
          return Promise.resolve(options.onCancel?.(...rest)).finally(() => {
            dialog.component!.props.visible = false
          })
        },
        onOk: async(...rest: any[]) => {
          return Promise.resolve(options.onOk?.(...rest)).finally(() => {
            dialog.component!.props.visible = false
          })
        }
      })

      render(dialog, element)
    }
  })
}
