import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { OrderedElement } from '../../typing';
import { useSlate } from 'slate-react';
import { cloneDeep } from 'lodash';
import { findParent, findPath } from 'tant-editor/Editor/comm/slate-api';
import { setNodes } from 'slate';

type Props = {
  attributes: any;
  children: ReactNode;
  element: OrderedElement;
  onHover: (v: OrderedElement | null) => void;
};

const Index: FC<Props> = ({
  attributes, children, element, onHover,
}) => {
  const indentation = element.indentation || 0;
  const slate = useSlate();
  useEffect(() => {
    const path = findPath(slate, element);
    let index = path[path.length - 1];
    let needUpdate = false;
    let order = cloneDeep(element.order || {});
    if (index === 0) {
      if (element.order?.num !== 1 || element.order?.str !== '') {
        needUpdate = true;
        order.num = 1;
        order.str = '';
      }
    } else {
      const nodes = findParent(slate, path)?.[0]?.children || [];
      const brotherNodes = nodes.slice(0, index)
        .reverse();
      const startIndex = brotherNodes
        .findIndex((d: any) => d.type === 'Ordered' && d.indentation === indentation);
      const lastNode = nodes[index - 1];
      if (!lastNode) {
        return;
      }
      if (['Bullet', 'Ordered'].includes(lastNode.type)) {
        let num = 1;
        let str = '';
        if (lastNode.type === 'Ordered' && lastNode.indentation < indentation) {
          str = `${lastNode?.order?.str || ''}${lastNode?.order?.str ? '.' : ''}${lastNode?.order?.num}`;
        } else {
          if (startIndex > -1 && !brotherNodes.slice(0, startIndex + 1).some((d: any) => d.indentation < indentation)) {// 中间有比他缩进小的，说明重新开始
            num = ((brotherNodes[startIndex] as OrderedElement)?.order?.num || 0) + 1;
            str = (brotherNodes[startIndex] as OrderedElement)?.order?.str || '';
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
      setNodes(slate, {
        order,
      }, {
        at: path,
      })
    }
  });
  useEffect(() => {
    onHover(element);
  }, [element]);
  return (
    <div className="tant-editor-ordered"
      {...attributes}
      style={{
        textAlign: element.align || 'left',
        marginLeft: 20 * indentation,
      }}
      data-num={`${element.order?.str}${element.order?.str ? '.' : ''}${element.order?.num}.`}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  );
}

export default Index;