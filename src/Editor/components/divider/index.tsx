import React, { FC, ReactNode } from 'react';
import './index.less';
import { DividerElement } from '../../typing';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: DividerElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-divider',
      )}
      {...attributes}
      contentEditable={false}
    >
      {children}
    </div>
  );
}

export default Index;