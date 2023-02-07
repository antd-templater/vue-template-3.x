/**
 * import.meta
 */
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * import.meta.env
 */
declare interface ImportMetaEnv {
  readonly VITE_APP_RUN_ENV: string;
  readonly VITE_APP_API_BASE: string;
  readonly VITE_APP_PAGE_BASE: string;
  readonly VITE_APP_ROUTER_BASE: string;
  readonly VITE_APP_ROUTER_HASH: string;
  readonly VITE_APP_HIDE_SETTINGS: string;
}
