/**
 * Tree 数据
 */
declare interface Tree<L, V> {
  label: L;
  value: V;
  children?: Tree<T, V>[];
}

declare type LiteralTree = Tree<string | number, string | number>
