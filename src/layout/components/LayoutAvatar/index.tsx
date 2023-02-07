import 'ant-design-vue/es/dropdown/style/index.less'
import 'ant-design-vue/es/button/style/index.less'
import 'ant-design-vue/es/input/style/index.less'
import 'ant-design-vue/es/form/style/index.less'
import 'ant-design-vue/es/menu/style/index.less'

import { SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { InputPassword as AInputPassword } from 'ant-design-vue/es/input'
import AMenu, { MenuItem as AMenuItem } from 'ant-design-vue/es/menu'
import AForm, { FormItem as AFormItem } from 'ant-design-vue/es/form'
import ADropdown from 'ant-design-vue/es/dropdown'
import AMessage from 'ant-design-vue/es/message'
import AButton from 'ant-design-vue/es/button'
import AModal from 'ant-design-vue/es/modal'
import useUserStore from '@/store/user'
import * as authApi from '@/api/auth'

export default defineComponent({
  name: 'LayoutAvatar',
  props: {
    isTopMenu: {
      type: Boolean,
      default: false
    },
    isSideMenu: {
      type: Boolean,
      default: false
    },
    themeMode: {
      type: String,
      default: 'light'
    }
  },
  setup(props) {
    const userStore = useUserStore()
    const nickname = toRef(userStore, 'nickname')
    const avatar = toRef(userStore, 'avatar')
    const visible = ref(false)

    const ADropdownOverlay = () => {
      const doLogout = () => {
        AModal.confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk: () => { userStore.logout().then(() => window.location.reload()) }
        })
      }

      return (
        <>
          <AMenu
            class='layout-avatar-dropdown'
            style='min-width: 120px'
          >
            <AMenuItem key='1'>
              <a
                href='javascript:void(0);'
                onClick={() => { visible.value = true } }
              >
                <SettingOutlined style='margin-right: 10px'/>
                <span>修改密码</span>
              </a>
            </AMenuItem>

            <AMenuItem key='2'>
              <a
                href='javascript:void(0);'
                onClick={doLogout}
              >
                <LogoutOutlined style='margin-right: 10px'/>
                <span>退出登录</span>
              </a>
            </AMenuItem>
          </AMenu>
        </>
      )
    }

    const APasswordModal = () => {
      const formRef = ref<any>()

      const formModel = reactive({
        password: '',
        newPassword: '',
        confirmPassword: ''
      })

      const formRules = reactive({
        password: [{
          required: true,
          message: '请输入原密码'
        }],
        newPassword: [{
          required: true,
          validator: (_: any, value: string) => {
            if (value === '') {
              return Promise.reject(new Error('请输入新密码'))
            }
            if (value === formModel.password) {
              return Promise.reject(new Error('新密码与旧密码一样, 请重新输入'))
            }
            if (!/[a-z0-9A-Z_]{8,}/.test(value)) {
              return Promise.reject(new Error('您的密码长度不足8位'))
            }
            return Promise.resolve()
          }
        }],
        confirmPassword: [{
          required: true,
          validator: (_: any, value: string) => {
            if (value === '') {
              return Promise.reject(new Error('请确认新密码'))
            }
            if (value !== formModel.newPassword) {
              return Promise.reject(new Error('确认密码与新密码不一样, 请重新输入'))
            }
            return Promise.resolve()
          }
        }]
      })

      const APasswordModalFooter = () => {
        return (
          <>
            <AButton
              key='back'
              onClick={ () => { visible.value = false } }
            >
              <span>取消</span>
            </AButton>

            <AButton
              key='submit'
              type='primary'
              onClick={ () => { doForgetPassword() }}
            >
              <span>提交</span>
            </AButton>
          </>
        )
      }

      const doForgetPassword = async() => {
        try {
          const params = {
            userNo: userStore.userNo,
            password: formModel.password,
            newPassword: formModel.newPassword
          }

          await formRef.value.validate()

          await authApi.modifyPassword(params).then(res => {
            if (res.code !== '0000') {
              return Promise.reject(res)
            }
          })

          return userStore.logout().then(() => {
            AMessage.success('修改成功，即将返回登录界面')
            window.location.reload()
          })
        } catch (err: any) {
          AMessage.error(err.message)
        }
      }

      return (
        <AModal
          width={420}
          title='修改密码'
          bodyStyle={{ padding: '15px 30px 10px 30px' }}
          v-slots={{ footer: APasswordModalFooter }}
          v-model={[visible.value, 'visible']}
        >
          <AForm
            ref={formRef}
            model={formModel}
            rules={formRules}
            hideRequiredMark
          >
            <AFormItem
              name='password'
              label='原密码'
            >
              <AInputPassword
                v-model={[formModel.password, 'value']}
                placeholder='请输入原密码'
              />
            </AFormItem>

            <AFormItem
              name='newPassword'
              label='新密码'
              hasFeedback
            >
              <AInputPassword
                v-model={[formModel.newPassword, 'value']}
                placeholder='请输入新密码'
              />
            </AFormItem>

            <AFormItem
              name='confirmPassword'
              label='确认密码'
              hasFeedback
            >
              <AInputPassword
                v-model={[formModel.confirmPassword, 'value']}
                placeholder='请确认新密码'
              />
            </AFormItem>
          </AForm>
        </AModal>
      )
    }

    return () => (
      <div
        class='layout-avatar-container'
        style={{
          height: '100%',
          padding: '0 16px 0 10px',
          color: props.isTopMenu && props.themeMode !== 'light' ? '#ffffff' : 'inherit',
          cursor: 'pointer'
        }}
      >
        <ADropdown overlay={ ADropdownOverlay() }>
          <div
            class='layout-avatar-wrapper'
            style={{
              height: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              alignContent: 'center'
            }}
          >
            <div
              class='layout-avatar-img'
              style='width: 30px; height: 30px; flex: 0 0 auto; margin-right: 6px;'
            >
              <img
                style='display: block; width: 100%; height: 100%; margin: 0;'
                src={avatar.value}
              />
            </div>

            <span
              class='layout-avatar-nick'
              style={{
                flex: '1 1 auto',
                maxWidth: '120px',
                color: props.themeMode === 'light' || (props.themeMode === 'dark' && props.isSideMenu) ? '#303133' : '#f9f9f9',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              { nickname.value }
            </span>
          </div>
        </ADropdown>
        <APasswordModal/>
      </div>
    )
  }
})
