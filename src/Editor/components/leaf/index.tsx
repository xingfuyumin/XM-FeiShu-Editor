import React, { FC, ReactNode, useMemo } from 'react';
import './index.less';
import { Text } from '../../typing';
import classNames from 'classnames'
import { toDOMNode } from 'tant-editor/Editor/comm/slate-api';
import { useSlate } from 'slate-react';

type Props = {
  attributes: any;
  children: ReactNode;
  leaf: Text;
  text: Text;
  onClick: (v: any) => void;
};

const Index: FC<Props> = ({
  attributes, leaf, children, text, onClick,
}) => {
  const slate = useSlate();
  const [inlineCodeStart, inlineCodeEnd] = useMemo(() => {
    const nodes = (children as any).props.parent.children;
    const index = nodes.findIndex((d: any) => d === text);
    return [text.inline_code && !nodes[index - 1]?.inline_code, text.inline_code && !nodes[index + 1]?.inline_code];
  }, [children, text]);
  return (
    <span
      className={classNames(
        'tant-editor-leaf',
        leaf.bold ? 'tant-editor-text-bold' : '',
        leaf.background_color ? `tant-editor-text-bgcolor-${leaf.background_color || 0}` : '',
        leaf.text_color ? `tant-editor-text-textcolor-${leaf.text_color || 0}` : '',
        leaf.underline ? 'tant-editor-text-underline' : '',
        leaf.italic ? 'tant-editor-text-italic' : '',
        leaf.strikethrough ? 'tant-editor-text-strikethrough' : '',
        leaf.inline_code ? 'tant-editor-text-inlinecode' : '',
        inlineCodeStart ? 'tant-editor-text-inlinecode-start' : '',
        inlineCodeEnd ? 'tant-editor-text-inlinecode-end' : '',
        leaf.selection ? 'tant-editor-text-bgcolor-12' : '',
        leaf.link?.url ? 'tant-editor-text-link' : '',
      )}
      onClick={() => {
        if (leaf.link?.url) {
          onClick(toDOMNode(slate, text));
        }
      }}
      {...attributes}
    >
      {children}
    </span>
  );
}

export default Index;