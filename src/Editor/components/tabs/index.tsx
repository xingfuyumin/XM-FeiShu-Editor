import React, { FC, ReactNode, useEffect, useState } from 'react';
import './index.less';
import { TabsElement } from '../../typing';
import { Tabs } from '@tant/ui-next';
import { useSlate } from 'slate-react';
import usePath from 'tant-editor/Editor/hooks/usePath';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TabsElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const [index, setIndex] = useState(0);
  const slate = useSlate();
  const focusPathStr = (slate.selection?.focus?.path || []).join(',');
  const path = usePath(element) || [];
  const pathStr = path.join(',');
  useEffect(() => {
    if (index >= element.children?.length) {
      setIndex(0);
      slate.select({
        anchor: {
          offset: 0,
          path: [...path, 0],
        },
        focus: {
          offset: 0,
          path: [...path, 0],
        }
      });
      return;
    }
    if (focusPathStr.startsWith(`${pathStr},`)) {
      const i = focusPathStr.split(`${pathStr},`)[1].split(',')[0];
      if (i !== String(index)) {
        setIndex(Number(i));
        slate.select({
          anchor: {
            offset: 0,
            path: [...path, Number(i)],
          },
          focus: {
            offset: 0,
            path: [...path, Number(i)],
          }
        });
        return;
      }
    }
  }, [focusPathStr, pathStr, index])
  return (
    <div className="tant-editor-tabs" {...attributes}>
      <Tabs
        activeKey={String(index)}
        onChange={v => {
          const i = Number(v);
          console.log(456);
          setIndex(i);
          slate.select({
            anchor: {
              offset: 0,
              path: [...path, i],
            },
            focus: {
              offset: 0,
              path: [...path, i],
            }
          })
        }}
        size="small"
        type="editable-card"
        onEdit={(key, type) => {
          if (type === 'remove') {
            if (element.children.length <= 1) {
              return;
            }
            try {
              slate.removeNodes({
                at: [...path, Number(key)]
              });
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              slate.insertNodes({
                type: 'TabPane',
                title: `标签${element.children.length + 1}`,
                children: [
                  {
                    type: 'Text',
                    children: [
                      {
                        text: '',
                      }
                    ],
                  }
                ],
              } as any, {
                at: [...path, element.children.length]
              });
            } catch (err) {
              console.log(err);
            }
          }
        }}
        items={element.children.map((d, index) => ({
          key: String(index),
          label: <div>{d.title}</div>,
          children: (children as any)?.[index],
          forceRender: true,
        }))}
      />
    </div>
  );
}

export default Index;