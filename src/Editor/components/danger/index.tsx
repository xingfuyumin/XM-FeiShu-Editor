import React, { FC, ReactNode } from 'react';
import './index.less';
import { DangerElement } from '../../index.d';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: DangerElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-danger',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      <div className="tant-editor-danger-title" contentEditable={false}>{element.title}</div>
      {children}
    </div>
  );
}

export default Index;