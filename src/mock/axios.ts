import { request } from '@/utils/request'

const AxiosMocker = () => {
  request.interceptors.request.use(config => {
    config.headers['x-msw-requester'] = 'Axios'
    return config
  })
}

AxiosMocker()
