import React, { FC, ReactNode } from 'react';
import './index.less';
import { HeadingElement } from '../../typing';
import classNames from 'classnames'
import useHover from 'tant-editor/Editor/hooks/useHover';

type Props = {
  attributes: any;
  children: ReactNode;
  element: HeadingElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const props = useHover(element);
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
      {...props}
    >
      {children}
    </div>
  );
}

export default Index;