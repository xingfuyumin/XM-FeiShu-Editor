import React, { FC, ReactNode } from 'react';
import './index.less';
import { GridElement } from '../../index.d';

type Props = {
  attributes: any;
  children: ReactNode;
  element: GridElement;
};

const Index: FC<Props> = ({ 
  attributes, children, element,
 }) => {
  return (
    <div className="tant-editor-grid" {...attributes}>
      {children}
    </div>
  );
}

export default Index;