import React, { FC, ReactNode } from 'react';
import './index.less';
import { GridElement } from '../../typing';

type Props = {
  attributes: any;
  children: ReactNode;
  element: GridElement;
};

const Index: FC<Props> = ({
  attributes, children,
}) => {
  return (
    <div className="tant-editor-grid"
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Index;