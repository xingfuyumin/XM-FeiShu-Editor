import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { OrderedElement } from '../../index.d';
import { ReactEditor, useSlate } from 'slate-react';
import { cloneDeep } from 'lodash';
import useText from 'tant-editor/Editor/hooks/useText';
import useFocus from 'tant-editor/Editor/hooks/useFocus';
import typeTool from 'tant-editor/Editor/plugin/type-tool';

type Props = {
  attributes: any;
  children: ReactNode;
  element: OrderedElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const slate = useSlate();
  const isFocus = useFocus(element);
  useEffect(() => {
    const path = ReactEditor.findPath(slate, element);
    let index = path[path.length - 1];
    let needUpdate = false;
    let indentation = cloneDeep(element.indentation || {});
    let order = cloneDeep(element.order || {});
    
    if (index === 0) {
      // if (element.indentation?.num !== 0 || element.indentation?.max !== 10) {
      //   needUpdate = true;
      //   indentation.num = 0;
      //   indentation.max = 10;
      // }
    } else {
      const lastPath = path.slice(0, path.length - 1);
      lastPath.push(index - 1);
      const lastNode = (slate.node(lastPath)?.[0]) as any;
      if (!lastNode) {
        return;
      }
      if (['Bullet', 'Ordered'].includes(lastNode.type)) {
        const max = Math.min((lastNode.indentation?.num || 0) + 1, 10);
        const num = Math.min(max, element.indentation?.num || 0);
        if (element.indentation?.num !== num || element.indentation?.max !== max) {
          needUpdate = true;
          indentation.num = num;
          indentation.max = max;
        }
      } else {
        if (element.indentation?.num !== 0 || element.indentation?.max !== 10) {
          needUpdate = true;
          indentation.num = 0;
          indentation.max = 10;
        }
      }
    }
    if (index === 0) {
      if (element.order?.num !== 1 || element.order?.str !== '') {
        needUpdate = true;
        order.num = 1;
        order.str = '';
      }
    } else {
      const lastPath = path.slice(0, path.length - 1);
      lastPath.push(index - 1);
      const lastNode = (slate.node(lastPath)?.[0]) as any;
      if (!lastNode) {
        return;
      }
      if (['Bullet', 'Ordered'].includes(lastNode.type)) {
        let num = 1;
        let str = '';
        if (lastNode.type === 'Ordered' && lastNode.indentation?.num < indentation.num) {
          str = `${lastNode?.order?.str || ''}${lastNode?.order?.str ? '.' : ''}${lastNode?.order?.num}`;
        } else {
          const parentNode = slate.parent(path)?.[0];
          const nodes = (parentNode?.children || []).slice(0, path[path.length - 1]).reverse();
          const lastIndex = (nodes as any[]).findIndex((d: any) => d.type === 'Ordered' && d.indentation?.num === indentation.num);
          if (lastIndex > -1 && !nodes.slice(0, lastIndex + 1).some((d: any) => d.indentation?.num < indentation.num)) {// 中间有比他缩进小的，说明重新开始
            num = ((nodes[lastIndex] as OrderedElement)?.order?.num || 0) + 1;
            str = (nodes[lastIndex] as OrderedElement)?.order?.str || '';
          }
        }
        if (element.order?.num !== num || element.order?.str !== str) {
          needUpdate = true;
          order.num = num;
          order.str = str;
        }
      } else {
        if (element.order?.num !== 1 || element.order?.str !== '') {
          needUpdate = true;
          order.num = 1;
          order.str = '';
        }
      }
    }
    if (needUpdate) {
      slate.setNodes({
        indentation,
        order,
      }, {
        at: path,
      })
    }
  });
  useText(element);
  return (
    <div className="tant-editor-ordered"
      {...attributes}
      data-focus={isFocus}
      style={{
        textAlign: element.align || 'left'
      }}
      data-num={`${element.order?.str}${element.order?.str ? '.' : ''}${element.order?.num}.`}
    >
      {children}
    </div>
  );
}

export default typeTool(Index);