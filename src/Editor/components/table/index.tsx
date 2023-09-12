import React, { FC, ReactNode } from 'react';
import './index.less';
import { TableElement } from '../../index.d';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TableElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const property = element?.property || { column_size: 0, row_size: 0, column_width: [], merge_info: [] };
  const rowLen = property?.row_size || 0;
  const colLen = property?.column_size || 0;
  const rows = new Array(rowLen).fill('');
  const cols = new Array(colLen).fill('');
  const ignoreIndex: Record<string, boolean> = {};
  return (
    <div
      className="tant-editor-table"
      {...attributes}
    >
      <table>
        <colgroup>
          {
            cols.map((col, colIndex) => <col key={colIndex} width={property?.column_width?.[colIndex]} />)
          }
        </colgroup>
        {
          rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                cols.map((col, colIndex) => {
                  const index = rowIndex * colLen + colIndex;
                  const rowSpan = property.merge_info?.[index]?.row_span || 1;
                  const colSpan = property.merge_info?.[index]?.col_span || 1;
                  if (rowSpan > 1) {
                    for (let x = colIndex; x < colIndex + colSpan; x += 1) {
                      for (let y = rowIndex; y < rowIndex + rowSpan; y += 1) {
                        ignoreIndex[`${x}-${y}`] = true;
                      }
                    }
                    delete ignoreIndex[`${colIndex}-${rowIndex}`]; // 第一个是本身需要去掉
                  }
                  if (ignoreIndex[`${colIndex}-${rowIndex}`]) {
                    return null;
                  }
                  return (
                    <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan}>
                      {(children as any)?.[index]}
                    </td>
                  );
                })
              }
            </tr>
          ))
        }
      </table>
    </div>
  );
}

export default Index;