import { ReactEditor, useSlate } from 'slate-react';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { BulletElement, CalloutElement, DangerElement, HeadingElement, OrderedElement, TextElement, TipElement, WarningElement } from '../typing';
export default (element: BulletElement | OrderedElement | TextElement | HeadingElement | CalloutElement | TipElement | DangerElement | WarningElement) => {
  const slate = useSlate();
  useEffect(() => {
    const path = ReactEditor.findPath(slate, element);
    const nodes = cloneDeep(element.children);
    nodes?.forEach((d, index) => {
      let inlineCodeStart = d.inline_code_start;
      let inlineCodeEnd = d.inline_code_end;
      let newPath = [...path, index];
      if (d.inline_code) {
        if (index === 0 || !nodes[index - 1]?.inline_code) {
          inlineCodeStart = true;
        } else {
          inlineCodeStart = false
        }
        if (!nodes[index + 1]?.inline_code) {
          inlineCodeEnd = true;
        } else {
          inlineCodeEnd = false
        }
      } else {
        inlineCodeStart = false;
        inlineCodeEnd = false;
      }
      if (inlineCodeStart !== d.inline_code_start || inlineCodeEnd !== d.inline_code_end || newPath?.join(',') !== d?.path?.join(',')) {
        slate.setNodes({
          inline_code_start: inlineCodeStart,
          inline_code_end: inlineCodeEnd,
          path: newPath,
        }, {
          at: [...path, index],
        })
      }
    });
  })
}