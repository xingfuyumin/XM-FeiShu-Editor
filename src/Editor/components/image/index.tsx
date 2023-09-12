import React, { FC, ReactNode } from 'react';
import './index.less';
import { ImageElement } from '../../index.d';
import typeTool from 'tant-editor/Editor/plugin/type-tool';
import classNames from 'classnames'
import { Loading } from '@tant/ui-next';
import usePath from 'tant-editor/Editor/hooks/usePath';
import { ReactEditor, useSlate } from 'slate-react';
import { cloneDeep } from 'lodash'

type Props = {
  attributes: any;
  children: ReactNode;
  element: ImageElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const slate = useSlate();
  const path = usePath(element);
  if (!path) {
    return;
  }
  return (
    <div
      className={classNames(
        'tant-editor-image',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
      onClick={() => {
        window.slate = slate;
        ReactEditor.focus(slate);
        const nextPath = cloneDeep(path)
        nextPath[0] += 1;
        slate.select({
          anchor: {
            offset: 0,
            path: [...path, 0],
          },
          focus: {
            offset: 0,
            path: [...path, 0],
          }
        })
      }}
    >
      {
        element.loading ? <Loading /> : <img
          src={element?.src}
          alt=""
        />
      }
      {children}
    </div>
  );
}

export default typeTool(Index);