import { Node } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';


export default (node: Node) => {
  const slate = useSlate();
  try {
    return ReactEditor.findPath(slate, node);
  } catch {
    return null;
  }
}