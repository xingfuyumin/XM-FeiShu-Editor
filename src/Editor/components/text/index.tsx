import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { TextElement } from '../../typing';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TextElement;
  onHover: (v: TextElement | null) => void;
};

const Index: FC<Props> = ({
  attributes, children, element, onHover,
}) => {
  useEffect(() => {
    onHover(element);
  }, [element]);
  return (
    <div
      className="tant-editor-text"
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  );
}

export default Index;