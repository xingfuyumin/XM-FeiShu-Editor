import React, { FC, ReactNode } from 'react';
import './index.less';
import { GridColumnElement } from '../../index.d';


type Props = {
  attributes: any;
  children: ReactNode;
  element: GridColumnElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div className="tant-editor-grid-column"
      {...attributes}
      // style={{ width: `${element?.grid_column?.width_ratio || 0}%` }}
    >
      {children}
    </div>
  );
}

export default Index;