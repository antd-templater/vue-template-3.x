/**
 * Tree Structure
 */
declare type KeyValueListTree = { key: string | number; value: string | number; list?: KeyValueListTree; }
declare type TextValueListTree = { text: string | number; value: string | number; list?: TextValueListTree; }
declare type LabelValueListTree = { label: string | number; value: string | number; list?: LabelValueListTree; }
declare type TitleValueListTree = { title: string | number; value: string | number; list?: TitleValueListTree; }

declare type KeyValueOptionsTree = { key: string | number; value: string | number; options?: KeyValueOptionsTree; }
declare type TextValueOptionsTree = { text: string | number; value: string | number; options?: TextValueOptionsTree; }
declare type LabelValueOptionsTree = { label: string | number; value: string | number; options?: LabelValueOptionsTree; }
declare type TitleValueOptionsTree = { title: string | number; value: string | number; options?: TitleValueOptionsTree; }

declare type KeyValueChildrenTree = { key: string | number; value: string | number; children?: KeyValueChildrenTree; }
declare type TextValueChildrenTree = { text: string | number; value: string | number; children?: TextValueChildrenTree; }
declare type LabelValueChildrenTree = { label: string | number; value: string | number; children?: LabelValueChildrenTree; }
declare type TitleValueChildrenTree = { title: string | number; value: string | number; children?: TitleValueChildrenTree; }
