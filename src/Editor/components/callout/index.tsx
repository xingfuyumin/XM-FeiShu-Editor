import React, { FC, ReactNode, useRef } from 'react';
import './index.less';
import { CalloutElement } from '../../typing';
import useFocus from 'tant-editor/Editor/hooks/useHover';
import classNames from 'classnames'
import emoji from './emoji.json';
import { ReactEditor, useSlate } from 'slate-react';
import { closeCalloutTool, openCalloutTool } from 'tant-editor/Editor/plugin/callout-tool';
import { cloneDeep } from 'lodash';

type Props = {
  attributes: any;
  children: ReactNode;
  element: CalloutElement;
};


const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const isFocus = useFocus(element);
  const slate = useSlate();
  const ref = useRef<any>(null);
  return (
    <div
      className={classNames(
        'tant-editor-callout',
        `tant-editor-callout-bgcolor-${element?.callout?.background_color || 1}`,
        `tant-editor-callout-bdcolor-${element?.callout?.border_color || 1}`,
        `tant-editor-text-textcolor-${element?.callout?.text_color || 1}`,
      )}
      data-focus={isFocus}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}

      onMouseEnter={(e) => {
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        ref.current = setTimeout(() => {
          const dom = ReactEditor.toDOMNode(slate, element);
          if (!dom) {
            return;
          }
          const rect = dom.getBoundingClientRect();
          const top = (rect?.top || 0) - 40;
          const left = ((rect?.left + rect?.right) / 2) || 0;
          openCalloutTool({
            slate,
            top,
            left,
            path: ReactEditor.findPath(slate, element),
            callout: cloneDeep(element.callout || {}),
            close: () => {
              closeCalloutTool(slate);
            },
          });
        }, 500)
      }}
      onMouseLeave={() => {
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        ref.current = setTimeout(() => {
          closeCalloutTool(slate);
        }, 500);
        const dom = ReactEditor.toDOMNode(slate, element);
        if (!dom) {
          return;
        }
        const rect = dom.getBoundingClientRect();
        const top = (rect?.top || 0) - 40;
        const left = ((rect?.left + rect?.right) / 2) || 0;
        openCalloutTool({
          slate,
          top,
          left,
          path: ReactEditor.findPath(slate, element),
          callout: cloneDeep(element.callout || {}),
          timer: ref.current,
          close: () => {
            closeCalloutTool(slate);
          },
        });
      }}
    >
      <div className="tant-editor-callout-emoji">{(emoji as any)?.[element?.callout?.emoji_id || ''] || emoji.exclamation}</div>
      <div className="tant-editor-callout-content">
        {children}
      </div>

    </div>
  );
}

export default Index;