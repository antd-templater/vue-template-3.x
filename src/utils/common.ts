import { MaybeRef, ComputedRef } from 'vue'
import { isNonEmptyString } from 'js-simpler'
import { isNonEmptyObject } from 'js-simpler'
import { isNonEmptyArray } from 'js-simpler'
import { isFiniteNumber } from 'js-simpler'
import dayjs from '@/plugin/dayjs'

/**
 * 声明类型
 */
export type RawValue = <T = any>(value: MaybeRef<T> | ComputedRef<T>) => T;
export type TakeFixed = (num: string | number, digit?: number) => string;
export type TakePadEnd = (num: string | number, keep?: number) => string;
export type TakeTimeToDesc = (date?: dayjs.ConfigType, format?: string) => string;
export type TakeTimeToDate = (date?: dayjs.ConfigType, format?: dayjs.OptionType) => dayjs.Dayjs | undefined;
export type RequestBuilder = (action?: string, params?: Record<string, any>, paginate?: { pageNo?: number, pageSize?: number } | null, sorter?: AxiosSorter[] | AxiosSorter | null) => AxiosRequestResult;
export type TakeTextByKey = <T = string | number>(tree: Array<Record<string, any>>, key: string | number, field?: Array<string> | string) => T;
export type TakeNodeByKey = <T = Record<string, any>>(tree: Array<Record<string, any>>, key: string | number) => T | null;

/**
 * 获取原数据 Raw (Ref / Reactive)
 */
export const rawValue: RawValue = value => {
  return toRaw(unref(value))
}

/**
 * 数值精度 Fix (四舍五入)
 */
export const takeFixed: TakeFixed = (num, digit = NaN) => {
  if (!isFiniteNumber(+num)) {
    return isFiniteNumber(digit) && digit > 0 ? '0.' + ''.padEnd(digit, '0') : '0'
  }

  let string = ''
  let number = 0

  num = +num || 0
  number = isFiniteNumber(digit) ? Math.round(Math.pow(10, digit) * num) / Math.pow(10, digit) : num
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
 * 数值精度 Pad (精度补齐)
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
export const takeNodeByKey: TakeNodeByKey = (tree, key) => {
  if (isNonEmptyString(key) || isFiniteNumber(key)) {
    for (const node of tree) {
      if (key === node.value) {
        return node || null
      }

      if (isNonEmptyArray(node.children)) {
        const result = takeNodeByKey(node.children, key)

        if (result) {
          return result
        }
      }
    }
  }

  return null as any
}

/**
 * 取出节点文本
 */
export const takeTextByKey: TakeTextByKey = (tree, key, field = 'label') => {
  const node = takeNodeByKey(tree, key)

  if (isNonEmptyArray(field)) {
    for (const name of field) {
      const result = node?.[name]

      if (isNonEmptyString(result) || isFiniteNumber(result)) {
        return result
      }
    }

    return key
  }

  if (isNonEmptyString(field)) {
    const result = node?.[field]
    const isString = isNonEmptyString(result)
    const isNumber = isFiniteNumber(result)

    return isString || isNumber
      ? result
      : key
  }

  return key as any
}

/**
 * 封装传参格式
 */
export const requestBuilder: RequestBuilder = (action = '', params = {}, paginate, sorter) => {
  if (isNonEmptyArray(sorter)) {
    return {
      action: action,
      params: params,

      sorter: sorter.filter(opt => opt.field && opt.value).map(opt => ({
        field: opt.field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase(),
        value: opt.value.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
      })),

      pageSize: paginate?.pageSize ?? undefined,
      pageNo: paginate?.pageNo ?? undefined
    }
  }

  if (isNonEmptyObject(sorter)) {
    if (isNonEmptyString(sorter.field) && isNonEmptyString(sorter.value)) {
      return {
        action: action,
        params: params,

        sorter: {
          field: sorter.field.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase(),
          value: sorter.value.replace(/(^|\B)([A-Z])/g, '_$2').toLowerCase()
        },

        pageSize: paginate?.pageSize ?? undefined,
        pageNo: paginate?.pageNo ?? undefined
      }
    }
  }

  return {
    action: action,
    params: params,
    sorter: undefined,
    pageSize: paginate?.pageSize ?? undefined,
    pageNo: paginate?.pageNo ?? undefined
  }
}
