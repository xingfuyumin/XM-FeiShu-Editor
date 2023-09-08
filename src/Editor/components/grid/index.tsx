import React, { FC, ReactNode } from 'react';
import './index.less';
import { GridElement } from '../../index.d';
import useFocus from '../../hooks/useFocus';

type Props = {
  attributes: any;
  children: ReactNode;
  element: GridElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const isFocus = useFocus(element);
  return (
    <div className="tant-editor-grid"
      data-focus={isFocus}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default Index;