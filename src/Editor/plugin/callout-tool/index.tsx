import React, { FC, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';
import { Select } from '@tant/ui-next';
import { ReactEditor } from 'slate-react';
import { BaseEditor } from 'slate';
import { CalloutElement } from '../../typing';
import emoji from '../../components/callout/emoji.json';
import { useSetState } from 'ahooks';

type Props = {
  open?: boolean;
  top?: number,
  left?: number,
  slate: BaseEditor & ReactEditor,
  close?: () => void;
  path?: number[],
  callout?: CalloutElement['callout'],
  timer?: any;
};


const emojiOption = Object.entries(emoji).map(([k, v]) => ({
  key: k,
  value: k,
  label: <span className="tant-editor-callout-emoji">{v}</span>,
}))

const Index: FC<Props> = ({
  open = true,
  top = 0,
  left = 0,
  path,
  slate,
  callout,
  close,
  timer,
}) => {
  const ref = useRef<any>(null);
  const domRef = useRef<any>(null);
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
  const borderColorOptions = useMemo(() => {
    return Array(7).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-callout-bdcolor tant-editor-callout-bdcolor-${index}`} />
    }))
  }, []);

  const [state, setState] = useSetState<Record<string, any>>({});
  useEffect(() => {
    setState({
      emoji_id: callout?.emoji_id || 'exclamation',
      text_color: callout?.text_color || 1,
      background_color: callout?.background_color || 1,
      border_color: callout?.border_color || 1,
    });
  }, [open])
  useEffect(() => {
    if (open) {
      if (domRef.current) {
        // domRef.current.focus()
      }
    }
  }, [open])
  if (!open) {
    return null;
  }
  return (
    <div
      className="tant-editor-callout-tool"
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
      <Select
        options={emojiOption}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.emoji_id}
        onChange={(v) => {
          ;
          const newCallout = callout || {};
          newCallout.emoji_id = v;
          slate.setNodes({
            callout: newCallout
          }, {
            at: path,
          });
          setState({ emoji_id: v });
        }}
      />
      <Select
        options={textColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.text_color}
        onChange={(v) => {
          const newCallout = callout || {};
          newCallout.text_color = v;
          slate.setNodes({
            callout: newCallout
          }, {
            at: path,
          });
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
          const newCallout = callout || {};
          newCallout.background_color = v;
          slate.setNodes({
            callout: newCallout
          }, {
            at: path,
          });
          setState({ background_color: v });
        }}
      />

      <Select
        options={borderColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.border_color}
        onChange={(v) => {
          const newCallout = callout || {};
          newCallout.border_color = v;
          slate.setNodes({
            callout: newCallout
          }, {
            at: path,
          });
          setState({ border_color: v });
        }}
      />
    </div>
  );
}
let div = document.getElementById('tant-editor-callout-tool-container');
if (!div) {
  div = document.createElement('div');
  div.id = 'tant-editor-text-callout-container';
  document.body.appendChild(div);
}
const render = createRoot(div);
export const openCalloutTool = (obj: {
  top: number,
  left: number,
  slate: BaseEditor & ReactEditor,
  path?: number[],
  callout: CalloutElement['callout'],
  close?: () => void;
  timer?: any;
}) => {
  render.render(<Index
    {...obj}
  />);
}
export const closeCalloutTool = (slate: BaseEditor & ReactEditor) => {
  render.render(<Index
    open={false}
    slate={slate}
  />);
}