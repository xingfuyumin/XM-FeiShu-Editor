import React, { FC, ReactNode } from 'react';
import './index.less';
import { HeadingElement } from '../../index.d';
import useText from 'tant-editor/Editor/hooks/useText';
import useFocus from 'tant-editor/Editor/hooks/useFocus';
import typeTool from 'tant-editor/Editor/plugin/type-tool';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: HeadingElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  useText(element);
  const isFocus = useFocus(element);
  return (
    <div
      className={classNames(
        'tant-editor-heading',
        `tant-editor-heading-${element.level || 1}`
      )}
      data-focus={isFocus}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      {children}
    </div>
  );
}

export default typeTool(Index);