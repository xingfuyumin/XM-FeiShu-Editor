import React, { FC, ReactNode } from 'react';
import './index.less';
import { TableCellElement } from '../../typing';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TableCellElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className="tant-editor-table-cell"
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Index;