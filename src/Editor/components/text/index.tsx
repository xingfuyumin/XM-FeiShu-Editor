import React, { FC, ReactNode } from 'react';
import './index.less';
import { TextElement } from '../../index.d';
import useText from 'tant-editor/Editor/hooks/useText';
import useFocus from 'tant-editor/Editor/hooks/useFocus';
import typeTool from 'tant-editor/Editor/plugin/type-tool';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TextElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  useText(element);
  const isFocus = useFocus(element);
  return (
    <div
      className="tant-editor-text"
      {...attributes}
      data-focus={isFocus}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      {children}
    </div>
  );
}

export default typeTool(Index);;