import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import { Button, Input } from '@tant/ui-next'
import { useSlate } from 'slate-react';
import { cloneDeep } from 'lodash'
import { useSetState } from 'ahooks';
import { getLink, handleSelection } from 'tant-editor/Editor/tools';
import { BaseSelection, Text } from 'slate';

type Props = {
  rootDomRef: any;
  clickElement: any;
  setClickElement: (v: any) => void;
};
type State = {
  style: {
    left?: number,
    bottom?: number,
    top?: number,
    right?: number,
  }
  url?: string,
  selection?: BaseSelection,
};


const Index: FC<Props> = ({
  rootDomRef, clickElement, setClickElement,
}) => {
  const slate = useSlate();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useSetState<State>({ style: {} });
  const getToolPosition = () => {
    const rootRect = rootDomRef.current.getBoundingClientRect();
    const rect = clickElement.getBoundingClientRect();
    const obj: State = { style: {} };
    const left = rect.left - rootRect.left - 34;
    const right = rootRect.right - rect.right - 34;
    const top = rect.top - rootRect.top - 64 + rootDomRef.current.scrollTop;
    obj.style.top = top;
    obj.style.left = left;
    if (top < 0) {
      obj.style.top += 40 + rect.height;
    }
    if (left > rootRect.width / 2) {
      obj.style.left = undefined;
      obj.style.right = right;
    }
    obj.url = getLink(slate)?.url;
    obj.selection = cloneDeep(slate.selection);
    handleSelection(slate);
    slate.deselect();
    setData(obj);
    setOpen(true);
  };
  useEffect(() => {
    if (!clickElement) {
      setOpen(false);
      return;
    }
    getToolPosition();
  }, [clickElement]);
  useEffect(() => {
    const func = (e: any) => {
      if (!(ref.current as any)?.contains(e.target)) {
        setClickElement(null);
      }
    };
    if (open) {
      window.addEventListener('click', func);
    }
    return () => {
      window.removeEventListener('click', func);
    }
  }, [open, clickElement]);
  if (!open) {
    return null;
  }
  return (
    <div
      className="tant-editor-url-tool-container"
      ref={ref}
    >
      <div
        className="tant-editor-url-tool"
        style={data.style}
      >
        <Input
          className="tant-editor-url-tool-url"
          value={data.url}
          onChange={e => {
            setData({ url: e.target.value });
          }}
        />
        <Button
          danger
          size="small"
          onClick={() => {
            if (data.selection) {
              setClickElement(null);
              slate.setNodes({
                link: undefined,
              }, {
                at: data.selection,
                match: (node) => Text.isText(node)
              });
            }
          }}
        >删除</Button>
        <Button
          size="small"
          disabled={!data.url?.trim()}
          onClick={() => {
            if (data?.url) {
              window.open(data?.url?.trim(), '_blank')
            }
          }}
        >跳转</Button>
        <Button
          type="white"
          size="small"
          onClick={() => {
            setClickElement(null);
          }}
        >取消</Button>
        <Button
          size="small"
          onClick={() => {
            if (data.selection) {
              const newLink = cloneDeep(getLink(slate) || { url: '' });
              newLink.url = data.url?.trim() || '';
              setClickElement(null);
              slate.setNodes({
                link: newLink,
                selection: false,
              }, {
                at: data.selection,
                match: (node) => Text.isText(node)
              });
            }
          }}
        >保存</Button>
      </div>
    </div>
  );
}
export default Index;