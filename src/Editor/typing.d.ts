import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

interface Text {
  /**
   * 文字
   */
  text: string;
  /**
  * 	加粗
  */
  bold?: boolean;
  /**
     * 	斜体
     */
  italic?: boolean;
  /**
   * 	删除线
   */
  strikethrough?: boolean;
  /**
   * 	下划线
   */
  underline?: boolean;
  /**
   * 	inline 代码
   */
  inline_code?: boolean;
  /**
   * 	字体颜色
   */
  text_color?: FontColor;
  /**
   * 	背景色
   */
  background_color?: FontBackgroundColor;
  /**
   * 	链接
   */
  link?: Link;

  /**
   * 内部属性
   */
  selection?: boolean;
}
export interface Link {
  /**
   * 链接地址
   */
  url: string;
}
/**
* 字体背景色（分为深色系和浅色系）
* 1	浅粉红色
* 2	浅橙色
* 3	浅黄色
* 4	浅绿色
* 5	浅蓝色
* 6	浅紫色
* 7	浅灰色
* 8	暗粉红色
* 9	暗橙色
* 10	暗黄色
* 11	暗绿色
* 12	暗蓝色
* 13	暗紫色
* 14	暗灰色
*/
export type FontBackgroundColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
/**
 * 字体色
 * 1	粉红色
 * 2	橙色
 * 3	黄色
 * 4	绿色
 * 5	蓝色
 * 6	紫色
 * 7	灰色
 */
export type FontColor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * Block 的排版方式，比如居左等
 * 1	居左排版
 * 2	居中排版
 * 3  居右排版
 */
export type Align = 'left' | 'center' | 'right';
/**
 * 高亮块背景色（分为深色系和浅色系）
 * 1	浅红色
 * 2	浅橙色
 * 3	浅黄色
 * 4	浅绿色
 * 5	浅蓝色
 * 6	浅紫色
 * 7	浅灰色
 * 8	暗红色
 * 9	暗橙色
 * 10	暗黄色
 * 11	暗绿色
 * 12	暗蓝色
 * 13	暗紫色
 * 14	暗灰色
 */
export type CalloutBackgroundColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
/**
 * 高亮块边框色（色系与高亮块背景色色系一致）
 * 1	红色
 * 2	橙色
 * 3	黄色
 * 4	绿色
 * 5	蓝色
 * 6	紫色
 * 7	灰色
 */
export type CalloutBorderColor = 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
  * 代码块语言
  * 1	PlainText
  * 2	ABAP
3	Ada
4	Apache
5	Apex
6	Assembly
7	Bash
8	CSharp
9	C++
10	C
11	COBOL
12	CSS
13	CoffeeScript
14	D
15	Dart
16	Delphi
17	Django
18	Dockerfile
19	Erlang
20	Fortran
21	FoxPro
22	Go
23	Groovy
24	HTML
25	HTMLBars
26	HTTP
27	Haskell
28	JSON
29	Java
30	JavaScript
31	Julia
32	Kotlin
33	LateX
34	Lisp
35	Logo
36	Lua
37	MATLAB
38	Makefile
39	Markdown
40	Nginx
41	Objective
42	OpenEdgeABL
43	PHP
44	Perl
45	PostScript
46	Power
47	Prolog
48	ProtoBuf
49	Python
50	R
51	RPG
52	Ruby
53	Rust
54	SAS
55	SCSS
56	SQL
57	Scala
58	Scheme
59	Scratch
60	Shell
61	Swift
62	Thrift
63	TypeScript
64	VBScript
65	Visual
66	XML
67	YAML
68	CMake
69	Diff
70	Gherkin
71	GraphQL
72	OpenGL Shading Language
73	Properties
74	Solidity
75	TOML

*/
export type CodeLanguage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
  21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
  31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
  41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 |
  51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 |
  61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 |
  71 | 72 | 73 | 74 | 75;
/**
 * 分栏
 */
export interface GridElement {
  type: 'Grid';
  grid: {
    /**
     * 分栏列数量，取值范围 [2,5)
     */
    column_size: number;
  };
  children: GridColumnElement[];
}

type GridColumnChildren = TextElement | Bullet | Ordered | Heading | Image;

/**
 * 分栏列
 */
export interface GridColumnElement {
  type: 'GridColumn';
  grid_column: {
    /**
     * 当前分栏列占整个分栏的比例，取值范围 [1,99]
     */
    width_ratio?: number;
  };
  children: GridColumnChildren[];
}
/**
 * 文字
 */
export interface TextElement {
  type: 'Text';
  children: Text[];
  align?: Align;
}
/**
 * 无序列表
 */
export interface BulletElement {
  type: 'Bullet';
  children: Text[];
  align?: Align;
  indentation: number;
}
/**
 * 有序列表
 */
export interface OrderedElement {
  type: 'Ordered';
  children: Text[];
  align?: Align;
  indentation: number;
  order: {
    num?: number;
    str?: string;
  };
}
/**
 * 高亮块
 */
export interface CalloutElement {
  type: 'Callout';
  children: TextElement[];
  callout?: {
    /**
     * 背景色
     */
    background_color?: CalloutBackgroundColor,
    /**
     * 边框色
     */
    border_color?: CalloutBorderColor,
    /**
     * 字体色
     */
    text_color?: FontColor;
    /**
     * EmojiID。高亮块支持以下表情：https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/emoji
     */
    emoji_id?: string,
  }
}
/**
 * 标题
 */
export interface HeadingElement {
  type: 'Heading';
  children: Text[];
  align?: Align;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
/**
 * 标签页
 */
export interface TabsElement {
  type: 'Tabs';
  children: TabPaneElement[];
}
type TabPaneChildren = TextElement | Bullet | Ordered | Heading | Image | Tip | Warning | Danger | Divider | Quote | Table | Code | Callout | Grid;
/**
 * 标签内容
 */
export interface TabPaneElement {
  type: 'TabPane';
  title: string,
  children: TabPaneChildren[];
}
/**
 * 标签内容
 */
export interface ImageElement {
  type: 'Image';
  align?: Align;
  src: string;
  loading?: boolean;
  showSize?: [number | string, number | string];
  children: Text[];
}
/**
 * 帮助内容
 */
export interface TipElement {
  type: 'Tip';
  title: string;
  align?: Align;
  children: TextElement[];
}
/**
 * 警告内容
 */
export interface WarningElement {
  type: 'Warning';
  title: string;
  align?: Align;
  children: TextElement[];
}
/**
 * 警告内容
 */
export interface DangerElement {
  type: 'Danger';
  title: string;
  align?: Align;
  children: TextElement[];
}
/**
 * 引用内容
 */
export interface QuoteElement {
  type: 'Quote';
  children: TextElement[];
}
export interface DividerElement {
  type: 'Divider';
  children: Text[];
}
export interface CodeElement {
  type: 'Code';
  children: CodeLineElement[];
  language?: CodeLanguage;
  wrap?: boolean;
}
export interface CodeLineElement {
  type: 'CodeLine';
  children: Text[];
}
export interface TableElement {
  type: 'Table';
  children: TableCellElement[];
  property: {
    /**
     * 行数。
     */
    row_size: number;
    /**
    * 列数。
    */
    column_size: number;
    /**
    * 列宽，单位px。
    */
    column_width?: number[];
    /**
    * 单元格合并信息。在创建 Table 时候此属性是只读的，将由后端进行生成。如果需要对单元格进行合并操作，可以通过更新块的子请求 merge_table_cells 来实现。
    */
    merge_info?: {
      /**
       * 从当前行索引起被合并的连续行数。
       */
      row_span?: number;
      /**
       * 从当前列索引起被合并的连续列数。
       */
      col_span?: number;
    }[];
  }
}
type TableCellChildren = TextElement | Bullet | Ordered | Heading | Image;

export interface TableCellElement {
  type: 'TableCell';
  children: TableCellChildren[];
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: GridElement | BulletElement | TextElement | OrderedElement |
    HeadingElement | CalloutElement | TabsElement | TabPaneElement | ImageElement |
    TipElement | WarningElement | DangerElement | DividerElement | QuoteElement |
    TableElement | TableCellElement | CodeLineElement | CodeElement;
    Text: Text
  }
}