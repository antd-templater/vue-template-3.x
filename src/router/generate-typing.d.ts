export interface Menu {
  id?: string;
  key?: string;
  name: string;
  path: string;
  parentId?: string;
  component?: any;
  redirect?: string;
  children?: Menu[];
  meta?: {
    icon?: string;
    title?: string;
    target?: string;
    hideChildInMenu?: boolean | 'Y' | 'N';
    hideInMenu?: boolean | 'Y' | 'N';
    allowCache?: boolean | 'Y' | 'N';
  };
}

export interface Route {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  alias?: string;
  redirect?: string;
  query?: Record<string, any>;
  params?: Record<string, any>;
  matched?: Array<Matched>;
  component?: any;
  meta?: {
    icon?: any;
    match?: string;
    title?: string;
    target?: string;
    groupId?: string;
    external?: string;
    permission?: string[];
    componentName?: string;
    hideChildInMenu?: boolean | 'Y' | 'N';
    hideInMenu?: boolean | 'Y' | 'N';
    allowCache?: boolean | 'Y' | 'N';
  };
  children?: Array<Route>;
}

export interface ReqiredRoute extends Route {
  meta: NonNullable<Route['meta']>;
  component: NonNullable<Route['component']>;
}

export interface ListToTree {
  (list: Menu[], chidren: Menu[], parent: { id?: string | number }): void;
}

export interface TreeToRoute {
  (trees: Menu[], parent: Partial<Route>, components: Record<string, any>): Route[];
}

export interface GenerateDynamicPath {
  (parent: Partial<Route>, item: Partial<Menu>): string;
}

export interface GenerateDynamicComponent {
  (parent: Partial<Route>, item: Partial<Menu>, components: Record<string, any>): any;
}

export interface GenerateDynamicRouter {
  (params: Record<string, any>, components: Record<string, any>): Promise<Router[]>;
}

export interface GenerateLayoutRouter {
  (context: Record<string, any>): Record<string, any>
}

export interface GenerateViewsRouter {
  (context: Record<string, () => Promise<any>>): Record<string, () => Promise<any>>
}
