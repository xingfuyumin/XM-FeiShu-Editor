import React, { FC, ReactNode } from 'react';
import './index.less';
import { CodeLineElement } from '../../typing';
import classNames from 'classnames';

type Props = {
  attributes: any;
  children: ReactNode;
  element: CodeLineElement;
};

const Index: FC<Props> = ({
  attributes, children,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-codeline',
      )}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Index;