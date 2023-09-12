import React, { FC, ReactNode } from 'react';
import './index.less';
import { WarningElement } from '../../index.d';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: WarningElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-warning',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      <div className="tant-editor-warning-title" contentEditable={false}>{element.title}</div>
      {children}
    </div>
  );
}

export default Index;