/**
 * 请求扩展
 */
declare type AxiosSorter = {
  field: string;
  order: string;
}

declare type AxiosRequestOptions = {
  sorter?: AxiosSorter[] | AxiosSorter;
  [key: string]: any;
}

/**
 * 请求参数
 */
declare type AxiosRequestResult<T = any> = {
  param?: T;
  action?: string;
  sorter?: AxiosSorter[] | AxiosSorter;
  pageSize?: number;
  pageNo?: number;
}

/**
 * 响应数据
 */
declare type AxiosResponseResult<T = any> = {
  result: T;
  code: string | null | undefined;
  message: string | null | undefined;
}
