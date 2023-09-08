import { ReactEditor, useSlate } from 'slate-react';
export default (element: any): boolean => {
  const slate = useSlate();
  const pathStr = slate.selection?.focus?.path?.join(',');
  const pathTarget = ReactEditor.findPath(slate, element)?.join(',');
  return !!pathStr?.startsWith(`${pathTarget},`);
}