import React, { useMemo, type FC } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import Editable from './editable';
import './plugin/text-tool'
import './index.less';

const initialValue = [
  {
      "type": "Title",
      "align": "left",
      "children": [
          {
              "text": "所有支持",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          },
          {
              "text": "结构测试",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 1,
      "align": "left",
      "children": [
          {
              "text": "标题1",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 2,
      "align": "left",
      "children": [
          {
              "text": "标题2",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 3,
      "align": "left",
      "children": [
          {
              "text": "标题3",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 4,
      "align": "left",
      "children": [
          {
              "text": "标题4",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 5,
      "align": "left",
      "children": [
          {
              "text": "标题5",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 6,
      "align": "left",
      "children": [
          {
              "text": "标题6",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 7,
      "align": "left",
      "children": [
          {
              "text": "标题7",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 8,
      "align": "left",
      "children": [
          {
              "text": "标题8",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Heading",
      "level": 9,
      "align": "left",
      "children": [
          {
              "text": "标题9",
              "bold": true,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Text",
      "align": "left",
      "children": [
          {
              "text": "我是正文",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": true,
              "underline": false
          }
      ]
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "一级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 0
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "二级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 1
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "三级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 2
  },
  {
      "type": "Ordered",
      "align": "left",
      "indentation": 3,
      "children": [
          {
              "text": "四级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  },
  {
      "type": "Ordered",
      "align": "left",
      "indentation": 4,
      "children": [
          {
              "text": "五级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  },
  {
      "type": "Ordered",
      "align": "left",
      "indentation": 4,
      "children": [
          {
              "text": "五级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "五级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 4
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "五级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 4
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "五级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 4
  },
  {
      "type": "Ordered",
      "align": "left",
      "indentation": 3,
      "children": [
          {
              "text": "四级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  },
  {
      "type": "Bullet",
      "align": "left",
      "children": [
          {
              "text": "二级列表",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ],
      "indentation": 0
  },
  {
      "type": "Code",
      "wrap": false,
      "language": 56,
      "children": [
          {
              "type": "CodeLine",
              "align": "left",
              "children": [
                  {
                      "text": "select",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "CodeLine",
              "align": "left",
              "children": [
                  {
                      "text": "*",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "CodeLine",
              "align": "left",
              "children": [
                  {
                      "text": "from",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "CodeLine",
              "align": "left",
              "children": [
                  {
                      "text": "file_info",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "CodeLine",
              "align": "left",
              "children": [
                  {
                      "text": "where a = 1",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          }
      ]
  },
  {
      "type": "Quote",
      "children": [
          {
              "type": "Heading",
              "level": 9,
              "align": "left",
              "children": [
                  {
                      "text": "标题9",
                      "bold": true,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "我是正文",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "一级列表",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "Ffe ",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          }
      ]
  },
  {
      "type": "Callout",
      "callout": {
          "background_color": 2,
          "border_color": 2,
          "emoji_id": "exclamation"
      },
      "children": [
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "标题9",
                      "bold": true,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "我是正文",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Ordered",
              "align": "left",
              "indentation": 0,
              "children": [
                  {
                      "text": "一级列表",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "Ffe ",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          }
      ]
  },
  {
      "type": "Callout",
      "callout": {
          "background_color": 2,
          "border_color": 2,
          "emoji_id": "exclamation"
      },
      "children": [
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          }
      ]
  },
  {
      "type": "Divider",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "Image",
      "align": 2,
      "src": "/public/image/70.png",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "Image",
      "align": 2,
      "src": "/public/image/71.png",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "Grid",
      "grid": {
          "column_size": 5
      },
      "children": [
          {
              "type": "GridColumn",
              "grid_column": {
                  "width_ratio": 20
              },
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "GridColumn",
              "grid_column": {
                  "width_ratio": 20
              },
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "GridColumn",
              "grid_column": {
                  "width_ratio": 20
              },
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "GridColumn",
              "grid_column": {
                  "width_ratio": 20
              },
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "GridColumn",
              "grid_column": {
                  "width_ratio": 20
              },
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          }
      ]
  },
  {
      "type": "Table",
      "property": {
          "column_size": 5,
          "column_width": [
              100,
              100,
              100,
              100,
              100
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
              },
              {
                  "col_span": 1,
                  "row_span": 1
              }
          ],
          "row_size": 5
      },
      "children": [
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "标题9",
                              "bold": true,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "我是正文",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": true,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Ordered",
                      "align": "left",
                      "indentation": 0,
                      "children": [
                          {
                              "text": "一级列表",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  },
                  {
                      "type": "Bullet",
                      "align": "left",
                      "children": [
                          {
                              "text": "Ffe ",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ],
                      "indentation": 0
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TableCell",
              "children": [
                  {
                      "type": "Text",
                      "align": "left",
                      "children": [
                          {
                              "text": "",
                              "bold": false,
                              "inline_code": false,
                              "italic": false,
                              "strikethrough": false,
                              "underline": false
                          }
                      ]
                  }
              ]
          }
      ]
  },
  {
      "type": "Tip",
      "children": [
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "标题9",
                      "bold": true,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "我是正文",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Ordered",
              "align": "left",
              "indentation": 0,
              "children": [
                  {
                      "text": "一级列表",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "Ffe ",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          }
      ]
  },
  {
      "type": "Warning",
      "children": [
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "标题9",
                      "bold": true,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "我是正文",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Ordered",
              "align": "left",
              "indentation": 0,
              "children": [
                  {
                      "text": "一级列表",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "Ffe ",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          }
      ]
  },
  {
      "type": "Danger",
      "children": [
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "标题9",
                      "bold": true,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Text",
              "align": "left",
              "children": [
                  {
                      "text": "我是正文",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": true,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Ordered",
              "align": "left",
              "indentation": 0,
              "children": [
                  {
                      "text": "一级列表",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ]
          },
          {
              "type": "Bullet",
              "align": "left",
              "children": [
                  {
                      "text": "Ffe ",
                      "bold": false,
                      "inline_code": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false
                  }
              ],
              "indentation": 0
          }
      ]
  },
  {
      "type": "Tabs",
      "children": [
          {
              "type": "TabPane",
              "title": "标签2",
              "children": [
                  {
                      "type": "Tip",
                      "children": [
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "标题9",
                                      "bold": true,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "我是正文",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Ordered",
                              "align": "left",
                              "indentation": 0,
                              "children": [
                                  {
                                      "text": "一级列表",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Bullet",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "Ffe ",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ],
                              "indentation": 0
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TabPane",
              "title": "标签3",
              "children": [
                  {
                      "type": "Warning",
                      "children": [
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "标题9",
                                      "bold": true,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "我是正文",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Ordered",
                              "align": "left",
                              "indentation": 0,
                              "children": [
                                  {
                                      "text": "一级列表",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Bullet",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "Ffe ",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ],
                              "indentation": 0
                          }
                      ]
                  }
              ]
          },
          {
              "type": "TabPane",
              "title": "标签4",
              "children": [
                  {
                      "type": "Danger",
                      "children": [
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "标题9",
                                      "bold": true,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Text",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "我是正文",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": true,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Ordered",
                              "align": "left",
                              "indentation": 0,
                              "children": [
                                  {
                                      "text": "一级列表",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ]
                          },
                          {
                              "type": "Bullet",
                              "align": "left",
                              "children": [
                                  {
                                      "text": "Ffe ",
                                      "bold": false,
                                      "inline_code": false,
                                      "italic": false,
                                      "strikethrough": false,
                                      "underline": false
                                  }
                              ],
                              "indentation": 0
                          }
                      ]
                  }
              ]
          }
      ]
  },
  {
      "type": "Text",
      "align": "left",
      "children": [
          {
              "text": "",
              "bold": false,
              "inline_code": false,
              "italic": false,
              "strikethrough": false,
              "underline": false
          }
      ]
  }
];
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
        // console.log(value);
      }}
    >
      <Editable
        onUpload={onUpload}
      />
    </Slate>
  )
};

export default Index;
