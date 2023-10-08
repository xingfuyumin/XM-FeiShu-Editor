import React, { FC, useEffect, useRef, useState } from 'react';
import './index.less';
import { TableElement } from 'tant-editor/Editor/typing';
import classNames from 'classnames'

type Props = {
  table: HTMLElement | null;
  data: TableElement;
};

const Index: FC<Props> = ({
  table, data,
}) => {
  const [selectData, setSelectData] = useState({
    start: -1,
    end: -1,
    isCol: false,
    selecting: false,
  });
  const rowRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const [heightData, setHeightData] = useState<number[]>([]);
  const property = data?.property || { column_size: 0, row_size: 0, column_width: [], merge_info: [] };
  const rowLen = property?.row_size || 0;
  const colLen = property?.column_size || 0;
  const rows = new Array(rowLen).fill('');
  const cols = new Array(colLen).fill('');
  const start = Math.min(selectData.start, selectData.end);
  const end = Math.max(selectData.start,selectData.end);
  useEffect(() => {
    if (!table) {
      return;
    }
    const children = table.children;
    const arr = [];
    for (let i = 1; i < children.length; i += 1) {
      arr.push((children[i] as HTMLElement).offsetHeight);
    }
    setHeightData(arr);
  }, [data]);
  useEffect(() => {
    const func = (e: any) => {
      if (!(rowRef.current as any)?.contains(e.target) && !(window as any).tableSelectCol) {
        setSelectData({
          start: -1,
          end: -1,
          isCol: false,
          selecting: false,
        })
      }
    };
    window.addEventListener('mousedown', func);
    return () => {
      window.removeEventListener('mousedown', func);
    }
  }, [rowRef]);
  useEffect(() => {
    const func = (e: any) => {
      if (!(colRef.current as any)?.contains(e.target) && (window as any).tableSelectCol) {
        setSelectData({
          start: -1,
          end: -1,
          isCol: false,
          selecting: false,
        })
      }
    };
    window.addEventListener('mousedown', func);
    return () => {
      window.removeEventListener('mousedown', func);
    }
  }, [colRef]);
  return (
    <>
      <div className="tant-editor-rowtool tant-editor-tool" contentEditable={false} ref={rowRef}>
        {
          rows.map((d, index) => (
            <div
              key={index}
              style={{ height: heightData[index] }}
              className={classNames(
                !selectData.isCol && index >= start && index <= end ? 'tant-editor-tool-select' : ''
              )}
              onMouseDown={() => {
                (window as any).tableSelectCol = false;
                setSelectData({
                  selecting: true,
                  start: index,
                  end: index,
                  isCol: false,
                })
              }}
              onMouseUp={() => {
                setSelectData({
                  ...selectData,
                  selecting: false,
                })
              }}
              onMouseMove={() => {
                if (selectData.selecting && !selectData.isCol && selectData.end !== index) {
                  setSelectData({
                    ...selectData,
                    end: index,
                  })
                }
              }}
            />
          ))
        }
      </div>
      <div className="tant-editor-coltool tant-editor-tool" contentEditable={false} ref={colRef}>
        {
          cols.map((d, index) => (
            <div
              key={index}
              style={{ width: property?.column_width?.[index] }}
              className={classNames(
                selectData.isCol && index >= start && index <= end ? 'tant-editor-tool-select' : ''
              )}
              onMouseDown={() => {
                (window as any).tableSelectCol = true;
                setSelectData({
                  selecting: true,
                  start: index,
                  end: index,
                  isCol: true,
                })
              }}
              onMouseUp={() => {
                setSelectData({
                  ...selectData,
                  selecting: false,
                })
              }}
              onMouseMove={() => {
                if (selectData.selecting && selectData.isCol && selectData.end !== index) {
                  setSelectData({
                    ...selectData,
                    end: index,
                  })
                }
              }}
            />
          ))
        }
      </div>
    </>
  );
}

export default Index;