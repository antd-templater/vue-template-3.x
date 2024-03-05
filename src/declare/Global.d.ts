import type { NativeElements, ReservedProps, VNode } from 'vue'

declare global {
  namespace JSX {
    export interface Element extends VNode {}
    export interface IntrinsicElements extends NativeElements { [name: string]: any }
    export interface IntrinsicAttributes extends ReservedProps {}
  }
}

declare global {
  interface Window {
    [api: string]: any;
  }
}
