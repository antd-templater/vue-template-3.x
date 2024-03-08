/**
 * 请求参数 - 排序
 */
declare type AxiosSorter = {
  field: string;
  value: string;
}

/**
 * 请求参数
 */
declare type AxiosRequestResult<T = any> = {
  action?: string;
  params?: T;
  sorter?: AxiosSorter[] | AxiosSorter;
  pageSize?: number;
  pageNo?: number;
}

/**
 * 响应数据
 */
declare type AxiosResponseResult<T = any> = {
  result: T;
  code: string | number | null | undefined;
  message: string | null | undefined;
}
