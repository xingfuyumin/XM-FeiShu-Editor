import React, { FC, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';
import { Button, Input } from '@tant/ui-next';
import { ReactEditor } from 'slate-react';
import { BaseEditor, BaseSelection, Text as Text2 } from 'slate';
import { Text } from '../../typing';
import { closeCalloutTool } from '../callout-tool';
// import { closeTextTool } from '../text-tool';

type Props = {
  open?: boolean;
  top?: number,
  left?: number,
  slate: BaseEditor & ReactEditor,
  close?: () => void;
  selection?: BaseSelection,
  link?: Text['link'],
  timer?: any;
};

const Index: FC<Props> = ({
  open = true,
  top = 0,
  left = 0,
  selection,
  slate,
  link,
  close,
  timer,
}) => {
  const [url, setUrl] = useState('');
  const ref = useRef<any>(null);
  const domRef = useRef<any>(null);
  useEffect(() => {
    if (open) {
      setUrl(link?.url || '');
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    }
  }, [open])
  if (!open) {
    return null;
  }
  return (
    <div
      className="tant-editor-url-tool"
      style={{ left, top }}
      ref={domRef}
      tabIndex={1}
      onBlur={(e) => {
        if (!domRef.current?.contains(e.relatedTarget)) {
          if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
          }
          if (close) {
            close();
          }
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        ref.current = setTimeout(() => {
          if (close) {
            close();
          }
        }, 1500);
      }}
      onMouseEnter={() => {
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        if (timer) {
          clearTimeout(timer);
        }
      }}
    >
      <Input
        className="tant-editor-url-tool-url"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <Button
        danger
        size="small"
        onClick={() => {
          if (selection) {
            slate.setNodes({
              link: undefined,
            }, {
              at: selection,
              match: (node) => Text2.isText(node)
            });
          }
          if (close) {
            close();
          }
        }}
      >删除链接</Button>
      <Button
        type="white"
        size="small"
        onClick={() => {
          if (close) {
            close();
          }
        }}
      >取消</Button>
      <Button
        size="small"
        onClick={() => {
          const newLink = link || { url: '' };
          newLink.url = url.trim();
          if (selection) {
            slate.setNodes({
              link: newLink,
            }, {
              at: selection,
              match: (node) => Text2.isText(node)
            });
          }
          if (close) {
            close();
          }
        }}
      >保存</Button>
    </div>
  );
}
let div = document.getElementById('tant-editor-url-tool-container');
if (!div) {
  div = document.createElement('div');
  div.id = 'tant-editor-text-url-container';
  document.body.appendChild(div);
}
const render = createRoot(div);
export const openUrlTool = (obj: {
  top: number,
  left: number,
  slate: BaseEditor & ReactEditor,
  selection: BaseSelection,
  link: Text['link'],
  close?: () => void;
  timer?: any;
}) => {
  // closeTextTool(obj.slate);
  closeCalloutTool(obj.slate);
  render.render(<Index
    {...obj}
  />);
}
export const closeUrlTool = (slate: BaseEditor & ReactEditor) => {
  render.render(<Index
    open={false}
    slate={slate}
  />);
}