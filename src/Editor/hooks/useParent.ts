import { Editor } from 'slate';
import { useSlate } from 'slate-react';

const findIndex = (nodes: any[], element: any): number[] => {
  let index = 0;
  for (const node of nodes) {
    if (node === element) {
      return [index];
    } else if (node.children?.length) {
      const res = findIndex(node.children, element);
      res.unshift(index);
      return res;
    }
    index += 1;
  }
  return [];
}

export default (element: any): number[] => {
  const slate = useSlate();
  return findIndex(slate.children, element);
}