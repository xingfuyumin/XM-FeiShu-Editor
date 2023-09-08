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
  inline_code_start?: boolean;
  inline_code_end?: boolean;
  selection?: boolean;
  path?: number[];
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
  children: TextElement[];
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
  indentation: {
    num: number;
    max?: number;
  };
}
/**
 * 有序列表
 */
export interface OrderedElement {
  type: 'Ordered';
  children: Text[];
  align?: Align;
  indentation: {
    num: number;
    max?: number;
  };
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
  children: Text[];
  align?: Align;
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

type Node = GridElement | GridColumnElement | BulletElement | TextElement | OrderedElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: GridElement | BulletElement | TextElement | OrderedElement |
    HeadingElement | CalloutElement;
    Text: Text
  }
}