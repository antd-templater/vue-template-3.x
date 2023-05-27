import dayjs from 'dayjs'

/**
 * 声明类型
 */
export type TakeFixed = (num: string | number, digit?: number) => string;
export type TakePadEnd = (num: string | number, keep?: number) => string;
export type TakeTimeToDesc = (date?: dayjs.ConfigType, format?: string) => string;
export type TakeTimeToDate = (date?: dayjs.ConfigType, format?: dayjs.OptionType) => dayjs.Dayjs | undefined;
export type TakeTreeByKey = (tree: Array<LiteralTree>, key: LiteralTree['label']) => LiteralTree;
export type TakeLabelByKey = (tree: Array<LiteralTree>, key: LiteralTree['label'], out?: Array<'label'|'value'>) => LiteralTree['label'|'value'];
export type RequestBuilder = (action?: string, param?: Record<string, any>, pageNo?: number | null, pageSize?: number | null, sortField?: string, sortOrder?: string) => AxiosRequestResult

/**
 * 数值精度 Fix
 */
export const takeFixed: TakeFixed = (num, digit = 0) => {
  if (!isFinite(+num)) {
    return '0.' + ''.padEnd(digit, '0')
  }

  let string = ''
  let number = 0

  num = +num || 0
  digit = isFinite(digit) ? +digit : 2

  number = Math.round(Math.pow(10, digit) * num) / Math.pow(10, digit)
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
export const requestBuilder: RequestBuilder = (action = '', param = {}, pageNo = 0, pageSize = 10, sortField = '', sortOrder = '') => {
  const toSortField = (field?: string | null, order?: string | null) => {
    const sortField = field && field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
    const sortOrder = order && order.replace(/end$/i, '')
    return (sortOrder && sortField) || undefined
  }

  const toSortOrder = (field?: string | null, order?: string | null) => {
    const sortField = field && field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
    const sortOrder = order && order.replace(/end$/i, '')
    return (sortField && sortOrder) || undefined
  }

  const sortTopField = param.sortTopField
  const sortTopOrder = param.sortTopOrder

  delete param.sortTopField
  delete param.sortTopOrder

  return {
    param: param,
    action: action,
    sortField: toSortField(sortField, sortOrder),
    sortOrder: toSortOrder(sortField, sortOrder),
    sortTopField: toSortField(sortTopField, sortTopOrder),
    sortTopOrder: toSortOrder(sortTopField, sortTopOrder),
    pageSize: pageSize !== null ? pageSize : undefined,
    pageNo: pageNo !== null ? pageNo : undefined
  }
}
