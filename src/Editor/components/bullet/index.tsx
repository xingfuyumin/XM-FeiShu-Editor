import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { BulletElement } from '../../index.d';
import { ReactEditor, useSlate } from 'slate-react';
import { cloneDeep } from 'lodash';
import useText from 'tant-editor/Editor/hooks/useText';
import useFocus from 'tant-editor/Editor/hooks/useFocus';
import typeTool from 'tant-editor/Editor/plugin/type-tool';

type Props = {
  attributes: any;
  children: ReactNode;
  element: BulletElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const slate = useSlate();
  useEffect(() => {
    const path = ReactEditor.findPath(slate, element);
    let index = path[path.length - 1];
    let needUpdate = false;
    let indentation = cloneDeep(element.indentation || {});
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
    if (needUpdate) {
      slate.setNodes({
        indentation,
      }, {
        at: path,
      })
    }
  });
  useText(element);
  const isFocus = useFocus(element);
  return (
    <div
      className="tant-editor-bullet"
      data-focus={isFocus}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >

      {children}
    </div>
  );
}

export default typeTool(Index);