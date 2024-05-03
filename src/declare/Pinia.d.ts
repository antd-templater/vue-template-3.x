/** 
 * pinia-plugin-persist: TypeScript5.0+ moduleResolution bundler breaks types import
 */

declare module 'pinia-plugin-persist' {
  import { PiniaPluginContext } from 'pinia';

  declare type Store = PiniaPluginContext['store'];

  export interface PersistStrategy {
    key?: string;
    paths?: string[];
    storage?: Storage;
  }

  export interface PersistOptions {
    strategies?: PersistStrategy[];
    enabled: true;
  }

  declare module 'pinia' {
    interface DefineStoreOptionsBase<S, Store> {
        persist?: PersistOptions;
    }
  }

  export declare const updateStorage: (strategy: PersistStrategy, store: Store) => void;
  declare const _default: ({ options, store }: PiniaPluginContext) => void;
  export default _default;
}
