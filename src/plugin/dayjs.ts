import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import objectSupport from 'dayjs/plugin/objectSupport'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'

/**
 * 配置 dayjs 插件
 */
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.extend(objectSupport)
dayjs.extend(customParseFormat)

/**
 * 导出 dayjs 插件
 */
export default dayjs
