import React, { FC, useCallback, useEffect, useState } from 'react';
import './index.less';
import { Button, Select } from '@tant/ui-next'
import { useSlate, useSlateSelector } from 'slate-react';
import { Link, FontColor, FontBackgroundColor } from '../../typing'
import { debounce } from 'lodash';
import { useSetState } from 'ahooks';
import { getBgColor, getLink, getTextColor, handleBgColor, handleBold, handleInlineCode, handleItalic, handleStrikethrough, handleTextColor, handleUnderline, isBold, isInlineCode, isItalic, isStrikethrough, isUnderline } from 'tant-editor/Editor/tools';

type Props = {
  rootDom: any;
};
type State = {
  style: {
    left?: number,
    bottom?: number,
    top?: number,
    right?: number,
  }
  bold?: boolean,
  italic?: boolean,
  link?: Link,
  underline?: boolean,
  strikethrough?: boolean,
  inlineCode?: boolean,
  textColor?: FontColor,
  backgroundColor?: FontBackgroundColor,
};
export const alignOptions = [
  {
    key: 'left',
    value: 'left',
    label: '左对齐',
  },
  {
    key: 'center',
    value: 'center',
    label: '居中对齐',
  },
  {
    key: 'right',
    value: 'right',
    label: '右对齐',
  },
];
export const indentOptions = [
  {
    key: 'add',
    value: 'add',
    label: '增加缩进',
  },
  {
    key: 'sub',
    value: 'sub',
    label: '减少缩进',
  },
];


const Index: FC<Props> = ({
  rootDom,
}) => {
  const slate = useSlate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useSetState<State>({ style: {} });
  const selection = useSlateSelector((slate) => {
    const selection = slate.selection;
    return selection;
  });
  const setOpenDebounce = useCallback(debounce(setOpen, 200), []);
  useEffect(() => {
    const winSelection = getSelection();
    if (!winSelection?.toString()?.length) {
      setOpen(false);
      return;
    }
    if (winSelection) {
      const range = winSelection.getRangeAt(0);
      const rootRect = rootDom.getBoundingClientRect();
      const rect = range.getBoundingClientRect();
      const obj: State = { style: {} };
      const left = rect.left - rootRect.left - 24;
      const right = rect.right - rootRect.right - 24;
      const top = rect.top - rootRect.top - 24;
      const bottom = rect.bottom - rootRect.bottom - 24;
      if (top < bottom) {
        obj.style.bottom = bottom - 40 - rootDom.scrollTop;
      } else {
        obj.style.top = top - 40 - rootDom.scrollTop;
      }
      if (left < right) {
        obj.style.right = right;
      } else {
        obj.style.left = left;
      }
      obj.bold = isBold(slate);
      obj.italic = isItalic(slate);
      obj.link = getLink(slate);
      obj.underline = isUnderline(slate);
      obj.strikethrough = isStrikethrough(slate);
      obj.inlineCode = isInlineCode(slate);
      obj.textColor = getTextColor(slate);
      obj.backgroundColor = getBgColor(slate);
      setData(obj);
      console.log(obj);
      setOpenDebounce(true);
    }
  }, [selection]);
  if (!open) {
    return null;
  }
  return (
    <div className="tant-editor-text-tool-container"
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div
        className="tant-editor-text-tool"
        style={data.style}
      >
        <Select
          options={alignOptions}
          size="small"
          bordered={false}
          dropdownMatchSelectWidth={false}
          addonBefore={null}
          defaultValue="left"
        />
        <Select
          options={indentOptions}
          size="small"
          bordered={false}
          dropdownMatchSelectWidth={false}
          addonBefore={null}
          value="缩进"
          placeholder="缩进"
          showArrow={false}
        />
        <div className="tant-editor-text-tool-split" />
        <Button
          size="small"
          type={data.bold ? 'secondary' : 'text'}
          onClick={() => {
            handleBold(slate);
            setData({ bold: !data.bold });
          }}
        >加粗</Button>
        <Button
          size="small"
          type={data.strikethrough ? 'secondary' : 'text'}
          onClick={() => {
            handleStrikethrough(slate);
            setData({ strikethrough: !data.strikethrough });
          }}
        >删除线</Button>
        <Button
          size="small"
          type={data.italic ? 'secondary' : 'text'}
          onClick={() => {
            handleItalic(slate);
            setData({ italic: !data.italic });
          }}
        >斜体</Button>
        <Button
          size="small"
          type={data.underline ? 'secondary' : 'text'}
          onClick={() => {
            handleUnderline(slate);
            setData({ underline: !data.underline });
          }}
        >下划线</Button>
        <Button
          size="small"
          type={data.link?.url ? 'secondary' : 'text'}
          onClick={() => {

          }}
        >链接</Button>
        <Button
          size="small"
          type={data.inlineCode ? 'secondary' : 'text'}
          onClick={() => {
            handleInlineCode(slate);
            setData({ inlineCode: !data.inlineCode });
          }}
        >代码</Button>
        <div className="tant-editor-text-tool-split" />
        <Select
          options={[]}
          size="small"
          bordered={false}
          dropdownMatchSelectWidth={false}
          addonBefore={null}
          value={data.textColor}
          onChange={(v) => {
            handleTextColor(slate, v);
            setData({ textColor: v });
          }}
        />
        <Select
          options={[]}
          size="small"
          bordered={false}
          dropdownMatchSelectWidth={false}
          addonBefore={null}
          value={data.backgroundColor}
          onChange={(v) => {
            handleBgColor(slate, v);
            setData({ backgroundColor: v });
          }}
        />
      </div>
    </div>
  );
}
export default Index;