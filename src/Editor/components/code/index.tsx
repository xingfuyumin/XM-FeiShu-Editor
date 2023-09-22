import React, { FC, ReactNode } from 'react';
import './index.less';
import { CodeElement } from '../../typing';
import classNames from 'classnames'
import { Switch } from '@tant/ui-next';
import { setNodes } from 'slate';
import { useSlate } from 'slate-react';
import { findPath } from 'tant-editor/Editor/comm/slate-api';

type Props = {
  attributes: any;
  children: ReactNode;
  element: CodeElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const slate = useSlate();
  return (
    <div
      className={classNames(
        'tant-editor-code',
      )}
      {...attributes}
    >
      <div className="tant-editor-code-tool" contentEditable={false}>
        <Switch
          size="small"
          checked={element.wrap}
          onChange={(v) => {
            const path = findPath(slate, element);
            setNodes(slate, {
              wrap: v,
            }, {
              at: path,
            })
          }}
        />
        &nbsp;
        自动换行
      </div>
      <div className="tant-editor-code-table-container">
        <div className="tant-editor-code-table">
          {
            element?.children?.map((d, i) => (
              <div className="tant-editor-code-row" key={i}>
                <div className="tant-editor-code-row-num" contentEditable={false}>{i + 1}</div>
                <div className={
                  classNames(
                    'tant-editor-code-row-content',
                    element.wrap ? 'tant-editor-code-row-content-wrap' : ''
                  )
                }>{(children as any)?.[i]}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Index;