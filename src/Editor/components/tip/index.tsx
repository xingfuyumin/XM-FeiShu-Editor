import React, { FC, ReactNode } from 'react';
import './index.less';
import { TipElement } from '../../typing';
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
        'tant-editor-tip',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      <div className="tant-editor-tip-title" contentEditable={false}>{element.title}</div>
      {children}
    </div>
  );
}

export default Index;