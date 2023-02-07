/**
 * 请求参数
 */
declare type AxiosRequestResult<T = any> = {
  param: T;
  action: string;
  sortField: string | undefined;
  sortOrder: string | undefined;
  sortTopField: string | undefined;
  sortTopOrder: string | undefined;
  pageSize: number | undefined;
  pageNo:number | undefined;
}

/**
 * 响应数据
 */
declare type AxiosResponseResult<T = any> = {
  result: T;
  code: string | null | undefined;
  message: string | null | undefined;
}
