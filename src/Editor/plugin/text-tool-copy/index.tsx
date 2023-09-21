import React, { FC, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';
import { Button, Select } from '@tant/ui-next';
import { ReactEditor } from 'slate-react';
import { BaseEditor, Text as Text2 } from 'slate';
import { getBgColor, getLink, getTextColor, handleBgColor, handleBold, handleInlineCode, handleItalic, handleSelection, handleStrikethrough, handleTextColor, handleUnderline, isBold, isInlineCode, isItalic, isStrikethrough, isUnderline } from 'tant-editor/Editor/tools';
import { Text } from '../../typing';
import { useSetState } from 'ahooks';
import { closeUrlTool, openUrlTool } from '../url-tool';
import { cloneDeep } from 'lodash';
import { closeCalloutTool } from '../callout-tool';

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

type Props = {
  open?: boolean;
  top?: number,
  left?: number,
  slate: BaseEditor & ReactEditor,
  close?: () => void;
};

const Index: FC<Props> = ({
  open = true,
  top = 0,
  left = 0,
  slate,
  close,
}) => {
  const textColorOptions = useMemo(() => {
    return Array(8).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-text-textcolor tant-editor-text-textcolor-${index}`}>A</div>
    }))
  }, []);
  const backgroundColorOptions = useMemo(() => {
    return Array(15).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-text-bgcolor tant-editor-text-bgcolor-${index}`} />
    }))
  }, []);
  const [state, setState] = useSetState<Text>({} as Text);
  useEffect(() => {
    setState({
      bold: isBold(slate),
      italic: isItalic(slate),
      link: getLink(slate),
      underline: isUnderline(slate),
      strikethrough: isStrikethrough(slate),
      inline_code: isInlineCode(slate),
      text_color: getTextColor(slate),
      background_color: getBgColor(slate),
    });
  }, [open])
  if (!open) {
    return null;
  }
  return (
    <div
      className="tant-editor-text-tool"
      style={{ left, top }}
    >
      <Select
        options={elementOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
      />
      <div className="tant-editor-text-tool-split" />
      <Select
        options={alignOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
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
        type={state.bold ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleBold(slate);
          setState({ bold: !state.bold });
        }}
      >加粗</Button>
      <Button
        size="small"
        type={state.strikethrough ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleStrikethrough(slate);
          setState({ strikethrough: !state.strikethrough });
        }}
      >删除线</Button>
      <Button
        size="small"
        type={state.italic ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleItalic(slate);
          setState({ italic: !state.italic });
        }}
      >斜体</Button>
      <Button
        size="small"
        type={state.underline ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleUnderline(slate);
          setState({ underline: !state.underline });
        }}
      >下划线</Button>
      <Button
        size="small"
        type={state.link?.url ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleSelection(slate);
          const link = cloneDeep(getLink(slate));
          const selection = cloneDeep(slate.selection);
          slate.deselect();
          if (close) {
            close();
          }
          setTimeout(() => {
            openUrlTool({
              slate,
              top,
              left,
              selection,
              link,
              close: () => {
                if (selection) {
                  slate.setNodes({
                    selection: false,
                  }, {
                    at: selection,
                    match: (node) => Text2.isText(node)
                  });
                }
                closeUrlTool(slate);
              },
            })
          }, 200)
        }}
      >链接</Button>
      <Button
        size="small"
        type={state.inline_code ? 'secondary' : 'tertiary'}
        onClick={() => {
          handleInlineCode(slate);
          setState({ inline_code: !state.inline_code });
        }}
      >代码</Button>
      <Select
        options={textColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.text_color}
        onChange={(v) => {
          handleTextColor(slate, v);
          setState({ text_color: v });
        }}
      />
      <Select
        options={backgroundColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.background_color}
        onChange={(v) => {
          handleBgColor(slate, v);
          setState({ background_color: v });
        }}
      />
    </div>
  );
}
let div = document.getElementById('tant-editor-text-tool-container');
if (!div) {
  div = document.createElement('div');
  div.id = 'tant-editor-text-tool-container';
  div.onmousedown = (e => {
    e.preventDefault();
    e.stopPropagation();
  });
  document.body.appendChild(div);
}
const render = createRoot(div);
export const openTextTool = (obj: {
  top: number,
  left: number,
  slate: BaseEditor & ReactEditor,
  close?: () => void;
}) => {
  closeUrlTool(obj.slate);
  closeCalloutTool(obj.slate);
  render.render(<Index
    {...obj}
  />);
}
export const closeTextTool = (slate: BaseEditor & ReactEditor) => {
  render.render(<Index
    open={false}
    slate={slate}
  />);
}