import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { BulletElement } from '../../typing';

type Props = {
  attributes: any;
  children: ReactNode;
  element: BulletElement;
  onHover: (v: BulletElement | null) => void;
};

const Index: FC<Props> = ({
  attributes, children, element, onHover,
}) => {
  const indentation = element.indentation || 0;
  useEffect(() => {
    onHover(element);
  }, [element]);
  return (
    <div
      className="tant-editor-bullet"
      {...attributes}
      data-dot={indentation % 2 === 0 ? '•' : '◦'}
      style={{
        textAlign: element.align || 'left',
        marginLeft: 20 * indentation,
      }}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  );
}

export default Index;