import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { HeadingElement } from '../../typing';
import classNames from 'classnames';

type Props = {
  attributes: any;
  children: ReactNode;
  element: HeadingElement;
  onHover: (v: HeadingElement | null) => void;
};

const Index: FC<Props> = ({
  attributes, children, element, onHover,
}) => {
  useEffect(() => {
    onHover(element);
  }, [element]);
  return (
    <div
      className={classNames(
        'tant-editor-heading',
        `tant-editor-heading-${element.level || 1}`
      )}
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