import React, { FC, ReactNode, useEffect } from 'react';
import './index.less';
import { ImageElement } from '../../typing';
import classNames from 'classnames'
import { Loading } from '@tant/ui-next';
import { useSelected, useSlate } from 'slate-react';
import { Resizable } from 're-resizable';
import { select, setNodes } from 'slate';
import { findPath } from 'tant-editor/Editor/comm/slate-api';
import ViewerJs from 'viewerjs-react';
import 'viewerjs-react/dist/index.css';

const Viewer = ViewerJs as any;

type Props = {
  attributes: any;
  children: ReactNode;
  element: ImageElement;
  onHover: (v: ImageElement | null) => void;
};

const Index: FC<Props> = ({
  attributes, children, element, onHover,
}) => {
  const slate = useSlate();
  const selected = useSelected();
  useEffect(() => {
    onHover(element);
  }, [element]);
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
        const path = findPath(slate, element);
        select(slate, path);
      }}
      contentEditable={false}
      onMouseEnter={() => onHover(element)}
      onMouseLeave={() => onHover(null)}
    >
      {children}

      <Resizable
        size={{
          width: element.showSize?.[0] || '100%',
          height: element.showSize?.[1] || '',
        }}
        lockAspectRatio
        onResize={(event, direction, elementRef) => {
          const img = elementRef.querySelector('img');
          if (img) {
            elementRef.style.width = `${img.offsetWidth}px`;
            elementRef.style.height = `${img.offsetHeight}px`;
          }
        }}
        onResizeStop={(event, direction, elementRef) => {
          const path = findPath(slate, element);
          const img = elementRef.querySelector('img');
          if (img) {
            setNodes(slate, {
              showSize: [img.offsetWidth, img.offsetHeight],
            }, {
              at: path,
            })
          }
        }}
        className='tant-editor-image-drag-resizable'
        minWidth={50}
        minHeight={50}
        maxWidth="100%"
      >
        {selected ? <Viewer
          title={false}
          className="tant-editor-image-view"
        >
          {
            element.loading ? <Loading /> : <img
              src={element?.src}
              alt=""
              contentEditable={false}
            />
          }
        </Viewer> :
          element.loading ? <Loading /> : <img
            src={element?.src}
            alt=""
            contentEditable={false}
          />
        }

      </Resizable>
    </div>
  );
}

export default Index;