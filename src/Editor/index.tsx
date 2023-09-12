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
    children: [{ text: '标题' }]
  },
  {
    type: 'Tabs',
    children: [
      {
        type: 'TabPane',
        title: '标签1',
        children: [
          {
            type: 'Text',
            children: [
              {
                text: '内容1',
              }
            ],
          }
        ],
      },
      {
        type: 'TabPane',
        title: '标签2',
        children: [
          {
            type: 'Text',
            children: [
              {
                text: '内容2',
              }
            ],
          }
        ],
      }
    ]
  },
  {
    type: 'Divider',
    children: [{ text: '' }]
  },
  // {
  //   type: 'Text',
  //   children: [{ text: '' }]
  // },
  // {
  //   type: 'Tip',
  //   title: '提示',
  //   children: [{
  //     type: 'Text',
  //     children: [
  //       {
  //         text: '提示',
  //       }
  //     ],
  //   }]
  // },
  // {
  //   type: 'Quote',
  //   children: [{
  //     type: 'Text',
  //     children: [
  //       {
  //         text: 'Quote',
  //       }
  //     ],
  //   }]
  // },
  // {
  //   type: 'Danger',
  //   title: '危险提示',
  //   children: [{
  //     type: 'Text',
  //     children: [
  //       {
  //         text: '危险提示',
  //       }
  //     ],
  //   }]
  // },
  // {
  //   type: 'Warning',
  //   title: '警告提示',
  //   children: [{
  //     type: 'Text',
  //     children: [
  //       {
  //         text: '警告提示',
  //       }
  //     ],
  //   }]
  // },
  // {
  //   type: 'Text',
  //   children: [{ text: '' }]
  // },
  {
    type: 'Code',
    children: [
      {
        type: 'Text',
        children: [
          {
            text: '我是代码我是代码',
          }
        ],
      },
      {
        type: 'Text',
        children: [
          {
            text: '我是代码我是代码',
          }
        ],
      },
      {
        type: 'Text',
        children: [
          {
            text: '我是代码我是代码',
          }
        ],
      },
      {
        type: 'Text',
        children: [
          {
            text: '我是代码我是代码',
          }
        ],
      },
      {
        type: 'Text',
        children: [
          {
            text: '我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码我是代码',
          }
        ],
      },
      {
        type: 'Text',
        children: [
          {
            text: '我是代码',
          }
        ],
      }
    ]
  },
  {
    type: 'Text',
    children: [
      {
        text: '我是代码',
      }
    ],
  },
  {
    type: 'Table',
    "property": {
      "column_size": 4,
      "column_width": [
        100,
        128,
        129,
        200,
      ],
      "merge_info": [
        {
          "col_span": 2,
          "row_span": 2
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },
        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 2,
          "row_span": 2
        },

        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 1,
          "row_span": 1
        },

        {
          "col_span": 1,
          "row_span": 1
        }
      ],
      "row_size": 4
    },
    children: [
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
      {
        type: 'TableCell',
        children: [{
          type: 'Text',
          children: [
            {
              text: '我是代码',
            }
          ],
        }]
      },
    ],
  }
]
type Props = {
  onUpload: (base64: string) => Promise<string>;
};
const Index: FC<Props> = ({
  onUpload,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate
      editor={editor}
      initialValue={initialValue as any}
      onChange={value => {
        console.log(value);
      }}
    >
      <Editable
        // onUpload={onUpload}
        onUpload={async () => {
          return await new Promise((r) => {
            setTimeout(() => {
              r('');
            }, 1000);
          });
        }}
      />
    </Slate>
  )
};

export default Index;
