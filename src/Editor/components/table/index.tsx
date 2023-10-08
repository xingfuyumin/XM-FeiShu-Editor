import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';
import { TableElement } from '../../typing';
import { useSlate } from 'slate-react';
import { findPath, setNodes } from 'tant-editor/Editor/comm/slate-api';
import { cloneDeep } from 'lodash';

type Props = {
  attributes: any;
  children: ReactNode;
  element: TableElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  const [selectData, setSelectData] = useState({
    startRow: -1,
    startCol: -1,
    endRow: -1,
    endCol: -1,
    selecting: false,
  });
  const slate = useSlate();
  const ref = useRef(null);
  const resizingRef = useRef(-1);
  const property = element?.property || { column_size: 0, row_size: 0, column_width: [], merge_info: [] };
  const rowLen = property?.row_size || 0;
  const colLen = property?.column_size || 0;
  const rows = new Array(rowLen).fill('');
  const cols = new Array(colLen).fill('');
  const ignoreIndex: Record<string, boolean> = {};
  const bounds = useMemo(() => {
    const arr: number[][] = [];
    for (let x = 0; x < rowLen; x += 1) {
      for (let y = 0; y < colLen; y += 1) {
        const index = x * colLen + y;
        const rowSpan = (property.merge_info?.[index]?.row_span || 1) - 1;
        const colSpan = (property.merge_info?.[index]?.col_span || 1) - 1;
        if (arr[index]) {
          continue
        }
        for (let x1 = x; x1 <= x + rowSpan; x1 += 1) {
          for (let y1 = y; y1 <= y + colSpan; y1 += 1) {
            arr[x1 * colLen + y1] = [x, y, x + rowSpan, y + colSpan];
          }
        }
      }
    }
    return arr;
  }, [element]);
  const selectBounds = useMemo(() => {
    let minStartRow = Math.min(selectData.startRow, selectData.endRow);
    let minStartCol = Math.min(selectData.startCol, selectData.endCol);
    let maxStartRow = Math.max(selectData.startRow, selectData.endRow);
    let maxStartCol = Math.max(selectData.startCol, selectData.endCol);
    let flag = false;
    while (!flag) {
      flag = true;
      for (let x = minStartRow; x <= maxStartRow; x += 1) {
        for (let y = minStartCol; y <= maxStartCol; y += 1) {
          const index = x * colLen + y;
          const bound = bounds[index] || [];
          if (bound[0] < minStartRow) {
            minStartRow = bound[0];
            flag = false;
          }
          if (bound[1] < minStartCol) {
            minStartCol = bound[1];
            flag = false;
          }
          if (bound[2] > maxStartRow) {
            maxStartRow = bound[2];
            flag = false;
          }
          if (bound[3] > maxStartCol) {
            maxStartCol = bound[3];
            flag = false;
          }
        }
      }
    }
    return [
      minStartRow,
      minStartCol,
      maxStartRow,
      maxStartCol,
    ];
  }, [selectData]);
  useEffect(() => {
    const func = (e: any) => {
      if (!(ref.current as any)?.contains(e.target)) {
        setSelectData({
          selecting: false,
          startRow: -1,
          startCol: -1,
          endRow: -1,
          endCol: -1,
        })
      }
    };
    window.addEventListener('mousedown', func);
    return () => {
      window.removeEventListener('mousedown', func);
    }
  }, [ref]);
  return (
    <div
      className="tant-editor-table"
      {...attributes}
    >
      {/* <TableTool
        table={ref.current}
        data={element}
      /> */}
      <table
        style={{ minWidth: property?.column_width?.reduce((sum, d) => sum + d) }}
        ref={ref}
        onMouseUp={() => {
          resizingRef.current = -1;
        }}
        onMouseLeave={() => {
          resizingRef.current = -1;
        }}
        onMouseMoveCapture={(e) => {
          if (resizingRef.current > -1) {
            const path = findPath(slate, element);
            const newProperty = cloneDeep(property);
            if (newProperty.column_width && newProperty.column_width[resizingRef.current]) {
              newProperty.column_width[resizingRef.current] += e.movementX || 0;
              if (newProperty.column_width[resizingRef.current] < 50) {
                newProperty.column_width[resizingRef.current] = 50;
              }
              setNodes(slate, {
                property: newProperty,
              }, {
                at: path,
              })
            }
          }
        }}
      >
        <colgroup>
          {
            cols.map((col, colIndex) => <col
              key={colIndex}
              width={property?.column_width?.[colIndex]}
            />)
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
                    return (
                      <td
                        style={{ display: 'none' }}
                        key={colIndex}
                      >
                        {(children as any)?.[index]}
                      </td>
                    )
                  }
                  return (
                    <td
                      className={
                        rowIndex >= selectBounds[0]
                          && rowIndex <= selectBounds[2]
                          && colIndex >= selectBounds[1]
                          && colIndex <= selectBounds[3]
                          ? 'tant-editor-table-select' : ''
                      }
                      key={colIndex}
                      rowSpan={rowSpan}
                      colSpan={colSpan}
                      onMouseDown={() => {
                        setSelectData({
                          selecting: true,
                          startRow: rowIndex,
                          startCol: colIndex,
                          endRow: rowIndex,
                          endCol: colIndex,
                        })
                      }}
                      onMouseUp={() => {
                        setSelectData({
                          ...selectData,
                          selecting: false,
                        })
                      }}
                      onMouseMove={() => {
                        if (selectData.selecting && (
                          selectData.endRow !== rowIndex || selectData.endCol !== colIndex
                        )) {
                          setSelectData({
                            ...selectData,
                            endRow: rowIndex,
                            endCol: colIndex,
                          })
                          window.getSelection()?.empty()
                          slate.deselect();
                        }
                      }}
                    >
                      <div
                        className="tant-editor-resizing"
                        contentEditable={false}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          resizingRef.current = colIndex + colSpan - 1;
                        }}
                      />
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