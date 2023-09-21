import React, { FC, ReactNode, useRef } from 'react';
import './index.less';
import { Text } from '../../typing';
import classNames from 'classnames'
import { closeUrlTool, openUrlTool } from 'tant-editor/Editor/plugin/url-tool';
import { useSlate } from 'slate-react';
import { cloneDeep } from 'lodash';

type Props = {
  attributes: any;
  children: ReactNode;
  leaf: Text;
};

const Index: FC<Props> = ({
  attributes, leaf, children,
}) => {
  const slate = useSlate();
  const ref = useRef<any>(null);
  return (
    <span
      className={classNames(
        'tant-editor-leaf',
        leaf.bold ? 'tant-editor-text-bold' : '',
        leaf.background_color ? `tant-editor-text-bgcolor-${leaf.background_color || 0}` : '',
        leaf.text_color ? `tant-editor-text-textcolor-${leaf.text_color || 0}` : '',
        leaf.underline ? 'tant-editor-text-underline' : '',
        leaf.italic ? 'tant-editor-text-italic' : '',
        leaf.strikethrough ? 'tant-editor-text-strikethrough' : '',
        leaf.inline_code ? 'tant-editor-text-inlinecode' : '',
        leaf.inline_code_start ? 'tant-editor-text-inlinecode-start' : '',
        leaf.inline_code_end ? 'tant-editor-text-inlinecode-end' : '',
        leaf.selection ? 'tant-editor-text-bgcolor-15' : '',
        leaf.link?.url ? 'tant-editor-text-link' : '',
      )}
      onClick={() => {
        if (leaf.link?.url) {
          window.open(leaf.link?.url, '_blank')
        }
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        ref.current = setTimeout(() => {
          if (!leaf.link?.url) {
            return;
          }
          const dom = e.target as any;
          if (!dom) {
            return;
          }
          const rect = dom.getBoundingClientRect();
          const top = (rect?.top || 0) - 40;
          const left = ((rect?.left + rect?.right) / 2) || 0;
          openUrlTool({
            slate,
            top,
            left,
            selection: {
              anchor: {
                offset: 0,
                path: leaf.path || [],
              },
              focus: {
                offset: leaf.text.length - 1,
                path: leaf.path || [],
              }
            },
            link: cloneDeep(leaf.link || {} as Text['link']),
            close: () => {
              closeUrlTool(slate);
            },
          })
        }, 500)
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
        if (!leaf.link?.url) {
          return;
        }
        ref.current = setTimeout(() => {
          closeUrlTool(slate);
        }, 500);
        const dom = e.target as any;
        if (!dom) {
          return;
        }
        const rect = dom.getBoundingClientRect();
        const top = (rect?.top || 0) - 40;
        const left = ((rect?.left + rect?.right) / 2) || 0;
        openUrlTool({
          slate,
          top,
          left,
          selection: {
            anchor: {
              offset: 0,
              path: leaf.path || [],
            },
            focus: {
              offset: leaf.text.length - 1,
              path: leaf.path || [],
            }
          },
          link: cloneDeep(leaf.link || {} as Text['link']),
          timer: ref.current,
          close: () => {
            closeUrlTool(slate);
          },
        })
      }}
      {...attributes}
    >
      {children}
    </span>
  );
}

export default Index;