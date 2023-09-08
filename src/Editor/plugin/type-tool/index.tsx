import React, { FC, useMemo } from 'react';
import './index.less';
import { Button, Popover } from '@tant/ui-next';
import { TaAdd2, TaDashboardMgr, TaDone } from '@tant/icons';
import { alignOptions, elementOptions, indentOptions } from '../text-tool';
import classNames from 'classnames'
import { Align } from '../../index.d';
import { ReactEditor, useSlate } from 'slate-react';
import { BaseEditor, Editor, Element } from 'slate';

type Props = {
  type: string;
  align: Align;
  slate: BaseEditor & ReactEditor,
  path: number[];
  isAdd: boolean;
  indentation: {
    num: number;
    max?: number;
  };
}


const PopoverContent: FC<Props> = ({
  type, align, slate, path, indentation, isAdd,
}) => {
  const elementFilterOptions = useMemo(() => {
    if (isAdd && path.length === 1) {
      return elementOptions;
    }
    return elementOptions.filter(d => !d.key.startsWith('Grid'));
  }, [type]);
  return (
    <div contentEditable={false}>
      {elementFilterOptions.map(d => (
        <div
          className={classNames(
            'tant-editor-type-tool-popover-option',
            type === d.value ? 'tant-editor-type-tool-popover-option-active' : '',
          )}
          key={d.key}
          onClick={() => {
            if (d.key.startsWith('Grid')) {
              slate.insertNode({
                type: 'Grid',
                grid: {
                  column_size: d.value as number,
                },
                children: Array(d.value).fill('').map(() => ({
                  grid_column: {
                    // width_ratio: 100 / (d.value as number)
                  },
                  type: 'GridColumn',
                  children: [{
                    type: 'Text',
                    children: [{ text: '' }] }]
                  })),
              }, {
                at: path
              });
              slate.select({
                anchor: {
                  path: [...path, 0, 0, 0],
                  offset: 0,
                },
                focus: {
                  path: [...path, 0, 0, 0],
                  offset: 0,
                }
              });
              return;
            }
            const tType: any = d.key.startsWith('Heading') ? 'Heading' : d.value;
            if (type === tType && tType !== 'Heading') {
              return;
            }
            if (type === 'Ordered') {
              if (tType === 'Bullet') {
                slate.setNodes(
                  {
                    type: tType,
                    order: undefined,
                  },
                  { at: path }
                )
                return;
              }
              if (tType === 'Heading') {
                slate.setNodes(
                  {
                    type: tType,
                    order: undefined,
                    indentation: undefined,
                    level: d.value as any,
                  },
                  { at: path }
                )
                return;
              }
              slate.setNodes(
                {
                  type: tType,
                  indentation: undefined,
                  order: undefined,

                },
                { at: path }
              )
              return;
            }
            if (type === 'Bullet') {
              if (tType === 'Ordered') {
                slate.setNodes(
                  {
                    type: tType,
                  },
                  { at: path }
                )
                return;
              }
              if (tType === 'Heading') {
                slate.setNodes(
                  {
                    type: tType,
                    indentation: undefined,
                    level: d.value as any,
                  },
                  { at: path }
                )
                return;
              }
              slate.setNodes(
                { type: tType, indentation: undefined },
                { at: path }
              )
              return;
            }
            if (type === 'Heading') {
              if (tType === 'Heading') {
                slate.setNodes(
                  {
                    type: tType,
                    level: d.value as any,
                  },
                  { at: path }
                )
                return;
              }
              slate.setNodes(
                { type: tType, level: undefined },
                { at: path }
              )
              return;
            }
            if (type === 'Text') {
              if (tType === 'Heading') {
                slate.setNodes(
                  {
                    type: tType,
                    level: d.value as any,
                  },
                  { at: path }
                )
                return;
              }
              slate.setNodes(
                { type: tType, level: undefined },
                { at: path }
              )
              return;
            }
            if (type === 'Callout') {
              slate.setNodes(
                { type: tType, callout: undefined },
                { at: path }
              )
              return;
            }
          }}
        >
          <div>{d.label}</div>
          <TaDone />
        </div>))
      }
      <div className="tant-editor-type-tool-popover-split" />
      {
        alignOptions.map(d => (
          <div
            className={classNames(
              'tant-editor-type-tool-popover-option',
              align === d.value ? 'tant-editor-type-tool-popover-option-active' : '',
            )}
            key={d.key}
            onClick={() => {
              slate.setNodes({
                align: d.value as Align,
              }, {
                at: path,
              })
            }}
          >
            <div>{d.label}</div>
          <TaDone />
          </div>))
      }
      {
        ['Bullet', 'Ordered'].includes(type) && <div className="tant-editor-type-tool-popover-split" />
      }
      {
        ['Bullet', 'Ordered'].includes(type) && indentOptions.map(d => (
          <div
            className={classNames(
              'tant-editor-type-tool-popover-option',
              type === d.value ? 'tant-editor-type-tool-popover-option-active' : '',
              (d.value === 'add' && indentation?.num >= (indentation?.max || 10)) || (d.value === 'sub' && indentation?.num <= 0) ?
              'tant-editor-type-tool-popover-option-disabled' : ''
            )}
            key={d.key}
            onClick={() => {
              if ((d.value === 'add' && indentation?.num >= (indentation?.max || 10)) || (d.value === 'sub' && indentation?.num <= 0)) {
                return;
              }
              slate.setNodes({
                indentation: { max: indentation?.max || 10, num: d.value === 'add' ? (indentation?.num || 0) + 1 : (indentation?.num || 0) - 1 },
              }, {
                at: path,
              })
            }}
          >
            <div>{d.label}</div>
          </div>))
      }
    </div>
  );
}

export default (Com: any) => {
  return (props: any) => {
    const element = props?.element;
    const slate = useSlate();
    const path = ReactEditor.findPath(slate, element);
    const indentation = element.indentation;
    const isAdd = element?.type === 'Text' && !element?.children?.[0]?.text;
    return <Popover
      placement='left'
      trigger="hover"
      getPopupContainer={e => e.parentElement || document.body}
      autoAdjustOverflow={false}
      overlayClassName='tant-editor-type-tool-popover-button'
      content={
        <Popover
          placement='left'
          trigger="hover"
          content={<PopoverContent
            type={element?.type || ''}
            align={element?.align || 'left'}
            slate={slate}
            path={path}
            indentation={indentation}
            isAdd={isAdd}
          />}
          getPopupContainer={e => e.parentElement || document.body}
          overlayClassName='tant-editor-type-tool-popover'
        >
          <Button
            type="text"
            size="small"
            icon={isAdd ? <TaAdd2 /> : <TaDashboardMgr />}
          />
        </Popover>
      }
    >
      <div
        style={{
          marginLeft: 20 * (element?.indentation?.num || 0)
        }}>
        <Com {...props} />
      </div>
    </Popover>
  }
}
