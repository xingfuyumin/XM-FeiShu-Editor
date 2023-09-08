import { ReactEditor, useSlate } from 'slate-react';

export default (node: any) => {
  const slate = useSlate();
  return ReactEditor.findKey(slate, node)?.id;
}