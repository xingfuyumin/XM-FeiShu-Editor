import React, { FC, ReactNode } from 'react';
import './index.less';
import { TabPaneElement } from '../../index.d';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TabPaneElement;
};

const Index: FC<Props> = ({
  attributes, children,
}) => {
  return (
    <div className="tant-editor-tabpane" {...attributes}>
      {children}
    </div>
  );
}

export default Index;