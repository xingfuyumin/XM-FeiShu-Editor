import React, { FC, ReactNode } from 'react';
import './index.less';
import { CalloutElement } from '../../typing';
import classNames from 'classnames'
import emoji from './emoji.json';

type Props = {
  attributes: any;
  children: ReactNode;
  element: CalloutElement;
  onClick: (v: any) => void;
};


const Index: FC<Props> = ({
  attributes, children, element, onClick,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-callout',
        `tant-editor-callout-bgcolor-${element?.callout?.background_color || 1}`,
        `tant-editor-callout-bdcolor-${element?.callout?.border_color || 1}`,
        `tant-editor-text-textcolor-${element?.callout?.text_color || 1}`,
      )}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onClick(element);
      }}
    >
      <div className="tant-editor-callout-emoji">{(emoji as any)?.[element?.callout?.emoji_id || ''] || emoji.exclamation}</div>
      <div className="tant-editor-callout-content">
        {children}
      </div>

    </div>
  );
}

export default Index;