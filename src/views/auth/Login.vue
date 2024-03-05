<template>
  <div class="login-container">
    <div class="main">
      <div class="main-container">
        <div class="main-header">
          <div class="title">
            <img
              src="@/assets/login/logo.svg"
              class="logo"
              alt="logo"
            >
            <span>系统平台</span>
          </div>
          <div class="description">
            <span>基于 Ant Design Vue v3.x 框架搭建</span>
          </div>
        </div>

        <div class="main-content">
          <AForm>
            <div style="padding: 1px; margin: 5px 0">
              <AFormItem v-bind="formUse.validateInfos.username">
                <AInput
                  v-model:value="formModel.username"
                  placeholder="账号: admin"
                  size="large"
                  type="text"
                  @pressEnter="doLogin"
                >
                  <template #prefix>
                    <UserOutlined :style="formStates.username ? { color: '#c0c0c0' } : {}" />
                  </template>
                </AInput>
              </AFormItem>
            </div>

            <div style="padding: 1px;">
              <AFormItem v-bind="formUse.validateInfos.password">
                <AInput
                  v-model:value="formModel.password"
                  placeholder="密码: 12345678"
                  size="large"
                  type="text"
                  @pressEnter="doLogin"
                >
                  <template #prefix>
                    <LockOutlined :style="formStates.password ? { color: '#c0c0c0' } : {}" />
                  </template>
                </AInput>
              </AFormItem>
            </div>

            <div style="padding: 0 5px; overflow: hidden">
              <ACheckbox v-model:checked="formModel.rememberMe">
                自动登录
              </ACheckbox>
            </div>

            <AFormItem style="margin: 30px 0 0">
              <AButton
                size="large"
                type="primary"
                class="login-button"
                :loading="loading"
                :disabled="loading"
                @click="doLogin"
              >
                登录
              </AButton>
            </AFormItem>
          </AForm>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="copyright">
        Copyright &copy; 2023 Antd-Templater
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import Notification from 'ant-design-vue/es/notification'
import Form from 'ant-design-vue/es/form'
import useUserStore from '@/store/user'
import md5 from 'md5'

defineOptions({ name: 'Login' })

const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

const formModel = reactive({
  username: '',
  password: '',
  passwordMd5: '',
  rememberMe: true
})

const formRules = reactive({
  username: [{
    required: true,
    message: '请输入用户名'
  }],
  password: [{
    required: true,
    message: '请输入密码'
  }]
})

const formStates = reactive({
  username: computed(() => formUse.validateInfos.username.validateStatus !== 'error'),
  password: computed(() => formUse.validateInfos.password.validateStatus !== 'error')
})

const formUse = Form.useForm(
  formModel,
  formRules
)

const doLogin = async() => {
  try {
    await formUse.validate()

    loading.value = true
    formModel.passwordMd5 = md5(formModel.password)

    return userStore.login({ ...formModel, password: formModel.passwordMd5 })
      .then(() => {
        Notification.success({
          message: `系统提示`,
          duration: 0.8,
          description: `欢迎回来`,
          onClose: () => {
            loading.value = false
            router.push({ path: '/' })
          }
        })
      })
      .catch(err => {
        if (err.message) {
          Notification.error({
            message: `系统提示`,
            duration: 0.8,
            description: err.message,
            onClose: () => { loading.value = false }
          })
        }
        setTimeout(() => { loading.value = false }, 500)
      })
  } catch {}
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  background: #f0f2f5 url(@/assets/login/background.svg);

  &>.main {
    width: 400px;
    height: 100%;
    flex: 0 0 auto;
    position: relative;

    &>.main-container {
      height: 450px;
      margin: auto 0;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 45px;
      right: 45px;
      bottom: 90px;

      &>.main-header {
        width: calc(100% - 72px);
        height: auto;
        margin: 0 auto 48px;

        &>.title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          text-align: center;
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;

          &>.logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }
        }

        &>.description {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.45);
          text-align: center;
          margin-top: 10px;
        }
      }

      &>.main-content {
        button.login-button {
          padding: 0 15px;
          width: calc(100% - 6px);
          margin: 0 3px;
        }
      }
    }
  }

  &>.footer {
    width: 100%;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    position: fixed;
    bottom: 0;

    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
}
</style>
