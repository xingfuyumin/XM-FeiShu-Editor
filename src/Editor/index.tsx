import React, { useMemo, type FC } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import Editable from './editable';
import './plugin/text-tool'
import './index.less';

const initialValue = [
  {
    type: 'Heading',
    level: 1,
    children: [{ text: '' }]
  },
  {
    type: 'Grid',
    grid: {
      column_size: 4,
    },
    children: [
      {
        type: 'GridColumn',
        grid_column: {
          width_ratio: 25,
        },
        children: [{
          type: 'Text',
          children: [{ text: '我是第一块内容' }]
        }]
      },
      {
        type: 'GridColumn',
        grid_column: {
          width_ratio: 25,
        },
        children: [{
          type: 'Text',
          children: [{ text: '我是第二块内容' }]
        }]
      },
      {
        type: 'GridColumn',
        grid_column: {
          width_ratio: 25,
        },
        children: [{
          type: 'Text',
          children: [{ text: '我是第三块内容' }]
        }]
      },
      {
        type: 'GridColumn',
        grid_column: {
          width_ratio: 25,
        },
        children: [{
          type: 'Text',
          children: [{ text: '我是第四块内容' }]
        }]
      },
    ],
  },
  {
    type: 'Bullet',
    indentation: { num: 0 },
    children: [
      { text: '我是一级列表' }
    ]
  },
  {
    type: 'Bullet',
    indentation: { num: 1 },
    children: [
      { text: '我是二级列表' }
    ]
  },
  {
    type: 'Bullet',
    indentation: { num: 2 },
    children: [
      { text: '我是三级列表' }
    ]
  },
  {
    type: 'Bullet',
    indentation: { num: 3 },
    children: [
      { text: '我是四级列表' }
    ]
  },
  {
    type: 'Bullet',
    indentation: { num: 4 },
    children: [
      { text: '我是五级列表' }
    ]
  },

  {
    type: 'Ordered',
    indentation: { num: 0 },
    children: [
      { text: '我是一级列表' }
    ]
  },
  {
    type: 'Ordered',
    indentation: { num: 1 },
    children: [
      { text: '我是二级列表' }
    ]
  },
  {
    type: 'Ordered',
    indentation: { num: 2 },
    children: [
      { text: '我是三级列表' }
    ]
  },
  {
    type: 'Ordered',
    indentation: { num: 3 },
    children: [
      { text: '我是四级列表' }
    ]
  },
  {
    type: 'Ordered',
    indentation: { num: 0 },
    children: [
      { text: '我是一级列表' }
    ]
  },
  {
    type: 'Ordered',
    indentation: { num: 1 },
    children: [
      { text: '我是二级列表' }
    ]
  },
  {
    type: 'Text',
    children: [{ text: '' }]
  },
  {
    type: 'Text',
    children: [{ text: '' }]
  },
]

const Index: FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate
      editor={editor}
      initialValue={initialValue as any}
      onChange={value => {
        console.log(value);
      }}>
        <Editable />
    </Slate>
  )
};

export default Index;
