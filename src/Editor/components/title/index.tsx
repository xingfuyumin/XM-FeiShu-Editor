import React, { FC, ReactNode } from 'react';
import './index.less';
import { HeadingElement } from '../../typing';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: HeadingElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-heading',
        `tant-editor-heading-${element.level || 1}`
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      {children}
    </div>
  );
}

export default Index;