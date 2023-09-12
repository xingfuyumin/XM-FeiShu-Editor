import React, { FC, ReactNode } from 'react';
import './index.less';
import { QuoteElement } from '../../index.d';
import classNames from 'classnames'

type Props = {
  attributes: any;
  children: ReactNode;
  element: QuoteElement;
};

const Index: FC<Props> = ({
  attributes, children, element,
}) => {
  return (
    <div
      className={classNames(
        'tant-editor-quote',
      )}
      {...attributes}
      style={{
        textAlign: element.align || 'left'
      }}
    >
      {children}
    </div>
  );
}

export default Index;