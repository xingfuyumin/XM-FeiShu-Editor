import React, { FC, useState } from 'react';
import classNames from 'classnames'
const arrX = Array(9).fill('');
const arrY = Array(9).fill('');
const Index: FC = () => {
  const [{ x, y }, setState] = useState({ x: -1, y: -1 });
  return (
    <div className='tant-editor-table-create-container'
      onClick={() => {
        (window as any).tableCreateNum = [x, y];
      }}>
      <div className='tant-editor-table-create-header'>
        {x + 1} × {y + 1}
      </div>
      <div className='tant-editor-table-create-content'>
        {
          arrX.map((d, x0) => {
            return (
              <div className='tant-editor-table-create-row' key={x0}>
                {
                  arrY.map((sd, y0) => <div
                    className={classNames(
                      'tant-editor-table-create-item',
                      x0 <= x && y0 <= y ? 'tant-editor-table-create-item-active' : '',
                    )}
                    key={y0}
                    onMouseEnter={() => setState({ x: x0, y: y0 })}
                  />)
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Index;