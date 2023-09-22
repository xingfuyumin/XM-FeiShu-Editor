import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './index.less';
import { Button, Select } from '@tant/ui-next'
import { useFocused, useSlate, useSlateSelector } from 'slate-react';
import { Link, FontColor, FontBackgroundColor } from '../../typing'
import { debounce } from 'lodash';
import { useSetState } from 'ahooks';
import { getBgColor, getLink, getTextColor, handleBgColor, handleBold, handleInlineCode, handleItalic, handleStrikethrough, handleTextColor, handleUnderline, isBold, isInlineCode, isItalic, isStrikethrough, isUnderline } from 'tant-editor/Editor/tools';

type Props = {
  rootDomRef: any;
  setClickElement: (d: any) => void;
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
  rootDomRef,
  setClickElement,
}) => {
  const slate = useSlate();
  const [open, setOpen] = useState(false);
  const focus = useFocused();
  const selectionLen = useSlateSelector(() => {
    return getSelection()?.toString()?.length;
  });
  const [data, setData] = useSetState<State>({ style: {} });
  const getToolPosition = useCallback(debounce(() => {
    const winSelection = getSelection();
    if (!winSelection) {
      return;
    }
    const range = winSelection.getRangeAt(0);
    const rootRect = rootDomRef.current.getBoundingClientRect();
    const rect = range.getBoundingClientRect();
    const obj: State = { style: {} };
    const left = rect.left - rootRect.left - 34;
    const right = rootRect.right - rect.right - 34;
    const top = rect.top - rootRect.top - 64 + rootDomRef.current.scrollTop;
    obj.style.top = top as number;
    obj.style.left = left;
    if (top < 0) {
      obj.style.top += 40 + rect.height;
    }
    if (left > rootRect.width * 1 / 3 ) {
      obj.style.left = undefined;
      obj.style.right = right;
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
    setOpen(true);
  }, 200), []);
  const textColorOptions = useMemo(() => {
    return Array(8).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-text-textcolor tant-editor-text-textcolor-${index || 'default'}`}>A</div>
    }))
  }, []);
  const backgroundColorOptions = useMemo(() => {
    return Array(15).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-text-bgcolor tant-editor-text-bgcolor-${index || 'default'}`} />
    }))
  }, []);
  useEffect(() => {
    if (!selectionLen || !focus) {
      setOpen(false);
      return;
    }
    getToolPosition();
  }, [selectionLen, focus]);
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
            setOpen(false);
            setClickElement(window.getSelection()?.getRangeAt(0));
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
          options={textColorOptions}
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
          options={backgroundColorOptions}
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