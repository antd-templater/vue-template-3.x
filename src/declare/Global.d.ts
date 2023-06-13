export {}

declare global {
  interface Window {
    [api: string]: any;
  }
}
