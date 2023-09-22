import React, { FC, useEffect, useMemo } from 'react';
import './index.less';
import { Select } from '@tant/ui-next';
import { ReactEditor } from 'slate-react';
import { BaseEditor } from 'slate';
import { CalloutElement } from '../../typing';
import emoji from '../../components/callout/emoji.json';
import { useSetState } from 'ahooks';
import { cloneDeep } from 'lodash';
import { findPath, setNodes } from 'tant-editor/Editor/comm/slate-api';

type Props = {
  slate: BaseEditor & ReactEditor,
  element: CalloutElement,
};


const emojiOption = Object.entries(emoji).map(([k, v]) => ({
  key: k,
  value: k,
  label: <span className="tant-editor-callout-emoji">{v}</span>,
}))

const Index: FC<Props> = ({
  slate,
  element,
}) => {
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
  const borderColorOptions = useMemo(() => {
    return Array(7).fill('').map((d, index) => ({
      key: String(index),
      value: index,
      label: <div className={`tant-editor-callout-bdcolor tant-editor-callout-bdcolor-${index || 'default'}`} />
    }))
  }, []);

  const [state, setState] = useSetState<Record<string, any>>({});
  useEffect(() => {
    setState({
      emojiId: element.callout?.emoji_id || 'exclamation',
      textColor: element.callout?.text_color || 1,
      backgroundColor: element.callout?.background_color || 1,
      borderColor: element.callout?.border_color || 1,
    });
  }, [element])
  return (
    <>
      <Select
        options={emojiOption}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.emojiId}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onChange={(v) => {
          const path = findPath(slate, element);
          const newCallout = cloneDeep(element.callout) || {};
          newCallout.emoji_id = v;
          setNodes(slate, {
            callout: newCallout
          }, {
            at: path,
          });
          setState({ emojiId: v });
        }}
      />
      <Select
        options={textColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.textColor}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onChange={(v) => {
          const path = findPath(slate, element);
          const newCallout = cloneDeep(element.callout) || {};
          newCallout.text_color = v;
          setNodes(slate, {
            callout: newCallout
          }, {
            at: path,
          });
          setState({ textColor: v });
        }}
      />
      <Select
        options={backgroundColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.backgroundColor}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onChange={(v) => {
          const path = findPath(slate, element);
          const newCallout = cloneDeep(element.callout) || {};
          newCallout.background_color = v;
          setNodes(slate, {
            callout: newCallout
          }, {
            at: path,
          });
          setState({ backgroundColor: v });
        }}
      />
      <Select
        options={borderColorOptions}
        size="small"
        bordered={false}
        dropdownMatchSelectWidth={false}
        addonBefore={null}
        value={state.borderColor}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className='tant-editor-callout-border'
        onChange={(v) => {
          const path = findPath(slate, element);
          const newCallout = cloneDeep(element.callout) || {};
          newCallout.border_color = v;
          setNodes(slate, {
            callout: newCallout
          }, {
            at: path,
          });
          setState({ borderColor: v });
        }}
      />
    </>
  );
}
export default Index;