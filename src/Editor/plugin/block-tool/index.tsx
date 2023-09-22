import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { useSlate } from 'slate-react';
import { useSetState } from 'ahooks';
import { toDOMNode } from 'tant-editor/Editor/comm/slate-api';
import CalloutTool from './callout';

type Props = {
  rootDomRef: any;
  clickBlockElement: any;
  setClickBlockElement: (v: any) => void;
};
type State = {
  style: {
    left?: number,
    bottom?: number,
    top?: number,
    right?: number,
  },
  element?: any;
};


const Index: FC<Props> = ({
  rootDomRef, clickBlockElement, setClickBlockElement,
}) => {
  const slate = useSlate();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useSetState<State>({ style: {} });
  const getToolPosition = () => {
    const dom = toDOMNode(slate, clickBlockElement) as HTMLElement;
    if (!dom) {
      return;
    }
    const rootRect = rootDomRef.current.getBoundingClientRect();
    const rect = dom.getBoundingClientRect();
    const obj: State = { style: {} };
    const left = rect.left - rootRect.left - 24 + rect.width / 2;
    const top = rect.top - rootRect.top - 64 + rootDomRef.current.scrollTop;
    obj.style.top = top;
    obj.style.left = left;
    obj.element = clickBlockElement;
    setData(obj);
    setOpen(true);
  };
  useEffect(() => {
    if (!clickBlockElement) {
      setOpen(false);
      return;
    }
    getToolPosition();
  }, [clickBlockElement]);
  useEffect(() => {
    const func = (e: any) => {
      if (!(ref.current as any)?.contains(e.target)) {
        setClickBlockElement(null);
      }
    };
    if (open) {
      window.addEventListener('click', func);
    }
    return () => {
      window.removeEventListener('click', func);
    }
  }, [open, clickBlockElement]);
  const render = useMemo(() => {
    if (!data.element) {
      return null;
    }
    if (data.element.type === 'Callout') {
      return <CalloutTool slate={slate} element={data.element} />;
    }
    return null;
  }, [data.element])
  if (!open) {
    return null;
  }
  return (
    <div
      className="tant-editor-block-tool-container"
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault()
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault()
      }}
    >
      <div
        className="tant-editor-block-tool"
        style={data.style}
        ref={ref}
      >
        {render}
      </div>
    </div>
  );
}
export default Index;