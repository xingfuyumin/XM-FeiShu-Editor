import React, { FC, ReactNode } from 'react';
import './index.less';
import { TipElement } from '../../index.d';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: TipElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-code',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      <div className="tant-editor-code-table">
        {
          element?.children?.map((d, i) => (
            <div className="tant-editor-code-row" key={i}>
              <div className="tant-editor-code-row-num" contentEditable={false}>{i + 1}</div>
              <div className="tant-editor-code-row-content">{(children as any)?.[i]}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Index;