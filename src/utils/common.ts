import dayjs from '@/plugin/dayjs'

/**
 * 声明类型
 */
export type TakeFixed = (num: string | number, digit?: number) => string;
export type TakePadEnd = (num: string | number, keep?: number) => string;
export type TakeTimeToDesc = (date?: dayjs.ConfigType, format?: string) => string;
export type TakeTimeToDate = (date?: dayjs.ConfigType, format?: dayjs.OptionType) => dayjs.Dayjs | undefined;
export type TakeTreeByKey = (tree: Array<LabelValueChildrenTree>, key: LabelValueChildrenTree['label']) => LabelValueChildrenTree;
export type TakeLabelByKey = (tree: Array<LabelValueChildrenTree>, key: LabelValueChildrenTree['label'], out?: Array<'label'|'value'>) => LabelValueChildrenTree['label'|'value'];
export type RequestBuilder = (action?: string, param?: Record<string, any>, pageNo?: number | null, pageSize?: number | null, options?: AxiosRequestOptions) => AxiosRequestResult

/**
 * 数值精度 Fix
 */
export const takeFixed: TakeFixed = (num, digit = NaN) => {
  if (!Number.isFinite(+num)) {
    return Number.isFinite(digit) && digit > 0 ? '0.' + ''.padEnd(digit, '0') : '0'
  }

  let string = ''
  let number = 0

  num = +num || 0
  number = Number.isFinite(digit) ? Math.round(Math.pow(10, digit) * num) / Math.pow(10, digit) : num
  string = String(number)

  if (~string.indexOf('.')) {
    const arr = string.split('.')
    string = arr[0] + '.' + arr[1].padEnd(digit, '0')
  } else if (digit !== 0) {
    string += '.' + ''.padEnd(digit, '0')
  }

  return string
}

/**
 * 数值精度 Pad
 */
export const takePadEnd: TakePadEnd = (num, keep = 0) => {
  const string = String(+num || 0)
  const [integer = '0', decimal = ''] = string.split('.')

  return +keep || decimal
    ? [integer, decimal.padEnd(+keep, '0')].join('.')
    : integer
}

/**
 * 转换 Dayjs Desc
 */
export const takeTimeToDesc: TakeTimeToDesc = (date, format) => {
  if (date !== null && date !== undefined) {
    try {
      return dayjs(date).format(format || 'YYYY-MM-DD HH:mm:ss')
    } catch {}
  }
  return ''
}

/**
 * 转换 Dayjs Date
 */
export const takeTimeToDate: TakeTimeToDate = (date, format) => {
  if (date !== null && date !== undefined) {
    try {
      return dayjs(date, format)
    } catch {}
  }
  return undefined
}

/**
 * 取出节点数据
 */
export const takeTreeByKey: TakeTreeByKey = (tree, key) => {
  function isString(obj: any): obj is string {
    return Object.prototype.toString.call(obj) === '[object String]'
  }

  function isNumber(obj: any): obj is number {
    return Object.prototype.toString.call(obj) === '[object Number]'
  }

  if (isString(key) || isNumber(key)) {
    for (const node of tree) {
      if (key === node.value) {
        return node
      }

      if (Array.isArray(node.children) && node.children.length > 0) {
        return takeTreeByKey(node.children, key)
      }
    }
  }

  return {} as ReturnType<TakeTreeByKey>
}

/**
 * 取出节点文本
 */
export const takeLabelByKey: TakeLabelByKey = (tree, key, out) => {
  if (Array.isArray(out)) {
    for (const name of out) {
      const result = takeTreeByKey(tree, key)[name]
      const isString = typeof result === 'string'
      const isNumber = typeof result === 'number'

      if (isString || isNumber) {
        return result
      }
    }
    return key
  }

  const result = takeTreeByKey(tree, key).label
  const isString = typeof result === 'string'
  const isNumber = typeof result === 'number'
  return isString || isNumber ? result : key
}

/**
 * 封装传参格式
 */
export const requestBuilder: RequestBuilder = (action = '', param = {}, pageNo = 0, pageSize = 10, options = {}) => {
  if (Array.isArray(options?.sorter)) {
    return {
      param: param,
      action: action,

      sorter: options.sorter.filter(opt => opt.field && opt.order).map(opt => ({
        field: opt.field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase(),
        order: opt.order.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
      })),

      pageSize: pageSize !== null ? pageSize : undefined,
      pageNo: pageNo !== null ? pageNo : undefined
    }
  }

  if (options?.sorter?.field && options?.sorter?.order) {
    return {
      param: param,
      action: action,

      sorter: {
        field: options?.sorter?.field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase(),
        order: options?.sorter?.order.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
      },

      pageSize: pageSize !== null ? pageSize : undefined,
      pageNo: pageNo !== null ? pageNo : undefined
    }
  }

  return {
    param: param,
    action: action,
    sorter: undefined,
    pageSize: pageSize !== null ? pageSize : undefined,
    pageNo: pageNo !== null ? pageNo : undefined
  }
}
