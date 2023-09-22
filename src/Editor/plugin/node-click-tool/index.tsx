import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import { Button } from '@tant/ui-next'
import { Dropdown } from 'antd';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseEditor, Element } from 'slate';
import { TextElement, BulletElement, OrderedElement, HeadingElement } from '../../typing'
import { TaAdd2, TaDashboardMgr } from '@tant/icons';
import { findParent, findPath, insertNode, setNodes, toDOMNode, unsetNodes } from 'tant-editor/Editor/comm/slate-api';
import uploadFileImg from 'tant-editor/Editor/comm/upload-file-img';
import TableCreate from './table-create';
import { cloneDeep } from 'lodash'
import { getImageSize } from 'tant-editor/Editor/comm/upload-clipboard-img';

type ToolElement = TextElement | BulletElement | OrderedElement | HeadingElement;
type Props = {
  hoverElement: ToolElement | null;
  rootDom: any;
  onUpload: (base64: string) => Promise<string>,
};
const delay = 500;

const elementMenuMap = {
  Text: {
    key: 'Text',
    label: '正文'
  },
  Heading: [{
    key: 'Heading1',
    label: 'H1 一级标题'
  },
  {
    key: 'Heading2',
    label: 'H2 二级标题'
  },
  {
    key: 'Heading3',
    label: 'H3 三级标题'
  },
  {
    key: 'Heading',
    label: '更多标题',
    popupOffset: [-4, 0],
    children: [
      {
        key: 'Heading4',
        label: 'H4 四级标题'
      },
      {
        key: 'Heading5',
        label: 'H5 五级标题'
      },
      {
        key: 'Heading6',
        label: 'H6 六级标题'
      },
      {
        key: 'Heading7',
        label: 'H7 七级标题'
      },
      {
        key: 'Heading8',
        label: 'H8 八级标题'
      },
      {
        key: 'Heading9',
        label: 'H9 九级标题'
      },
    ],
  },
  ],
  Bullet: {
    key: 'Bullet',
    label: '无序列表'
  },
  Ordered: {
    key: 'Ordered',
    label: '有序列表'
  },
  Code: {
    key: 'Code',
    label: '代码块'
  },
  Quote: {
    key: 'Quote',
    label: '引用'
  },
  Callout: {
    key: 'Callout',
    label: '高亮块'
  },
  Divider: {
    key: 'Divider',
    label: '分割线'
  },
  Image: {
    key: 'Image',
    label: '图片'
  },
  Table: {
    key: 'TableContainer',
    label: '表格',
    popupOffset: [-4, 0],
    children: [
      {
        key: 'Table',
        label: <TableCreate />
      },
    ],
  },
  Grid: {
    key: 'Grid',
    label: '分栏',
    popupOffset: [-4, 0],
    children: [
      {
        key: 'Grid1',
        label: '分栏一'
      },
      {
        key: 'Grid2',
        label: '分栏二'
      },
      {
        key: 'Grid3',
        label: '分栏三'
      },
      {
        key: 'Grid4',
        label: '分栏四'
      },
      {
        key: 'Grid5',
        label: '分栏五'
      },
    ],
  },
  divider: {
    type: 'divider',
  },
  Tabs: {
    key: 'Tabs',
    label: '标签页'
  },
  Tip: {
    key: 'Tip',
    label: '普通说明'
  },
  Warning: {
    key: 'Warning',
    label: '警告说明'
  },
  Danger: {
    key: 'Danger',
    label: '危险说明'
  },
  Indent: {
    key: 'Indent',
    label: '缩进',
    popupOffset: [-4, 0],
    children: [
      {
        key: 'indentAdd',
        label: '增加缩进',
        disabled: false,
      },
      {
        key: 'indentSub',
        label: '减少缩进',
        disabled: false,
      },
    ],
  },
  Align: {
    key: 'Align',
    label: '对齐方式',
    popupOffset: [-4, 0],
    children: [
      {
        key: 'Alignleft',
        label: '左对齐'
      },
      {
        key: 'Aligncenter',
        label: '中间对齐'
      },
      {
        key: 'Alignright',
        label: '右对齐'
      },
    ],
  },
}
const getElementMenus = (element: Element | null, isEmpty: boolean, slate: BaseEditor & ReactEditor) => {
  if (!element) {
    return [];
  }
  if (element.type === 'Image') {
    return [
      elementMenuMap.Align,
    ];
  }
  const list: any[] = [
    elementMenuMap.Text,
    ...elementMenuMap.Heading,
    elementMenuMap.Bullet,
    elementMenuMap.Ordered,
  ];
  const path = findPath(slate, element);
  const parentNode = findParent(slate, path)?.[0] as Element;
  const parentType = parentNode?.type;
  if (isEmpty) {
    if (parentType) { // 有父元素
      if (['TableCell', 'TabPane', 'GridColumn'].includes(parentType)) {
        list.push(...[
          elementMenuMap.divider,
          elementMenuMap.Quote,
          elementMenuMap.Callout,
          elementMenuMap.Tip,
          elementMenuMap.Warning,
          elementMenuMap.Danger,
          elementMenuMap.divider,
          elementMenuMap.Code,
          elementMenuMap.Image,
          elementMenuMap.Divider,
        ]);
      }
    } else { // 无父元素
      list.push(...[
        elementMenuMap.divider,
        elementMenuMap.Quote,
        elementMenuMap.Callout,
        elementMenuMap.Tip,
        elementMenuMap.Warning,
        elementMenuMap.Danger,
        elementMenuMap.divider,
        elementMenuMap.Code,
        elementMenuMap.Image,
        elementMenuMap.Divider,
        elementMenuMap.divider,
        elementMenuMap.Table,
        elementMenuMap.Tabs,
        elementMenuMap.Grid,
      ]);
    }
  }
  list.push(...[
    elementMenuMap.divider,
    elementMenuMap.Align,
  ]);
  if (['Bullet', 'Ordered'].includes(element.type)) {
    const Indent = cloneDeep(elementMenuMap.Indent);
    if ((element as any).indentation >= 10) {
      Indent.children[0].disabled = true;
    }
    if ((element as any).indentation <= 0) {
      Indent.children[1].disabled = true;
    }
    list.push(Indent);
  }
  return list;
}

const getData = (slate?: BaseEditor & ReactEditor, dom?: any, element?: ToolElement, rootDom?: any) => {
  const obj: {
    left: number,
    top: number,
    isEmpty: boolean,
    element: ToolElement | null,
    options: any[],
  } = {
    left: 0,
    top: 0,
    isEmpty: false,
    element: element || null,
    options: [],
  };
  if (!open || !slate || !dom || !element || !rootDom) {
    return obj;
  }
  const rootRect = rootDom.getBoundingClientRect();
  const rect = dom.getBoundingClientRect();
  obj.top = rect.top - rootRect.top - 24 + rect.height / 2 + rootDom.scrollTop; // 8是上边距
  obj.left = rect.left - rootRect.left - 52;
  if (['Text', 'Bullet', 'Ordered', 'Heading'].includes(element.type) && !element?.children?.[0]?.text?.trim()) {
    obj.isEmpty = true;
  } else {
    obj.isEmpty = false;
  }
  obj.options = getElementMenus(obj.element, obj.isEmpty, slate);
  return obj;
}



const getMenuKey = (element: Element | null) => {
  if (!element) {
    return [];
  }
  if (element.type === 'Heading') {
    return [`${element.type}${element.level}`]
  }
  if (element.type === 'Grid') {
    return [`${element.type}${element.grid.column_size}`]
  }
  return [element.type, `Align${(element as any).align}`];
}
const handleNodeChange = async (
  element: Element | null, key: string,
  slate: BaseEditor & ReactEditor,
  isEmpty: boolean,
  onUpload: (base64: string) => Promise<string> = async () => '',
) => {
  if (!element) {
    return;
  }
  const path = findPath(slate, element);
  const newElement: any = {
    type: '',
    children: [],
  };
  if (key === 'indentAdd') {
    setNodes(slate, {
      indentation: ((element as any).indentation || 0) + 1,
    }, {
      at: path
    });
    return;
  } else if (key === 'indentSub') {
    setNodes(slate, {
      indentation: ((element as any).indentation || 0) - 1,
    }, {
      at: path
    });
    return;
  } else if (key === 'Alignleft') {
    setNodes(slate, {
      align: 'left',
    }, {
      at: path
    });
    return;
  } else if (key === 'Aligncenter') {
    setNodes(slate, {
      align: 'center',
    }, {
      at: path
    });
    return;
  } else if (key === 'Alignright') {
    setNodes(slate, {
      align: 'right',
    }, {
      at: path
    });
    return;
  } else if (key.startsWith('Heading')) {
    const level = Number(key.split('Heading')[1]) || 1;
    newElement.type = 'Heading';
    newElement.level = level;
    newElement.children.push({ text: '' });
  } else if (key.startsWith('Grid')) {
    const num = Number(key.split('Grid')[1]) || 1;
    newElement.type = 'Grid';
    newElement.grid = { column_size: num };
    for (let i = 0; i < num; i += 1) {
      newElement.children.push({
        type: 'GridColumn',
        children: [{ type: 'Text', children: [{ text: '' }] }],
      });
    }
  } else if (key === 'Code') {
    newElement.type = 'Code';
    newElement.children.push({ type: 'CodeLine', children: [{ text: '' }] });
  } else if (key === 'Table') {
    const tableData = (window as any).tableCreateNum || [];
    if (!tableData[0] || !tableData[1]) {
      return;
    }
    newElement.type = key;
    const widths = [];
    const mergeInfos: {
      row_span?: number;
      col_span?: number;
    }[] = [];
    for (let x = 0; x <= tableData[0]; x += 1) {
      widths.push(90);
      for (let y = 0; y <= tableData[1]; y += 1) {
        newElement.children.push({
          type: 'TableCell',
          children: [{ type: 'Text', children: [{ text: '' }] }],
        });
        mergeInfos.push({
          row_span: 1,
          col_span: 1,
        })
      }
    }
    newElement.property = {
      row_size: tableData[0] + 1,
      column_size: tableData[1] + 1,
      column_width: widths,
      merge_info: mergeInfos,
    }
  } else if (key === 'Image') {
    const base64 = (await uploadFileImg()) as string;
    newElement.type = key;
    newElement.loading = true;
    newElement.src = base64;
    newElement.children.push({ text: '' });
    newElement.showSize = await getImageSize(base64) as [any, any];
    insertNode(slate, newElement, { at: path });
    const url = (await onUpload(base64)) || base64;
    const newPath = findPath(slate, newElement);
    setNodes(slate, {
      src: url || '',
      loading: false,
    }, {
      at: newPath.length ? newPath : path,
    });
    return;
  } else if (key === 'Tabs') {
    newElement.type = key;
    newElement.children.push({
      type: 'TabPane',
      title: '标签1',
      children: [{ type: 'Text', children: [{ text: '' }] }]
    });
  } else if (['Tip', 'Warning', 'Danger', 'Quote', 'Callout'].includes(key)) {
    newElement.type = key;
    newElement.children.push({ type: 'Text', children: [{ text: '' }] });
  } else {
    newElement.type = key;
    newElement.children.push({ text: '' });
  }
  if (!isEmpty) {
    newElement.children[0].text = newElement.children?.[0].element;
    setNodes(slate, newElement, {
      at: path,
    });
    if (['Bullet', 'Ordered'].includes(element.type)) {
      if (!['Bullet', 'Ordered'].includes(key)) {
        unsetNodes(slate, 'indentation', { at: path });
      }
    }
    if (['Heading'].includes(element.type)) {
      if (!['Heading'].includes(key)) {
        unsetNodes(slate, 'level', { at: path });
      }
    }
  } else {
    insertNode(slate, newElement, { at: path });
  }
}

const Index: FC<Props> = ({
  hoverElement, rootDom, onUpload,
}) => {
  const slate = useSlate();
  const timerRef = useRef(0);
  const [isHover, seIstHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{
    left: number,
    top: number,
    isEmpty: boolean,
    element: ToolElement | null
    options: any[],
    dom: any;
  }>({
    left: 0,
    top: 0,
    isEmpty: false,
    element: null,
    options: [],
    dom: null,
  });
  useEffect(() => {
    if (data.dom) {
      data.dom.setAttribute('data-focus', isHover);
    }
  }, [data.dom, isHover])
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
    if (!hoverElement) {
      timerRef.current = window.setTimeout(() => {
        setOpen(false);
      }, delay);
    }
    if (hoverElement) {
      const dom = toDOMNode(slate, hoverElement);
      const obj = getData(slate, dom, hoverElement, rootDom);
      setData((oldData) => {
        if (oldData.dom) {
          oldData.dom.setAttribute('data-focus', false);
        }
        return { ...obj, dom }
      });
    }
    setOpen(true);
  }, [hoverElement]);
  if (!open) {
    return null;
  }
  return (
    <div className="tant-editor-node-edit-tool-container">
      <div
        className="tant-editor-node-edit-tool"
        style={{
          left: data.left || 0,
          top: data.top || 0,
        }}
        onMouseEnter={() => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = 0;
          }
        }}
        onMouseLeave={() => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = 0;
          }
          timerRef.current = window.setTimeout(() => {
            setOpen(false);
          }, delay)
        }}
      >
        <Dropdown
          menu={{
            items: data.options,
            selectedKeys: getMenuKey(data.element),
            selectable: true,
            onClick: ({ key }) => handleNodeChange(data.element, key, slate, data.isEmpty, onUpload),
          }}
          onOpenChange={seIstHover}
        >
          <Button
            type="text"
            size="small"
            icon={data.isEmpty ? <TaAdd2 /> : <TaDashboardMgr />}
          />
        </Dropdown>
      </div>
    </div>
  );
}
export default Index;