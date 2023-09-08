import React, { FC, ReactNode } from 'react';
import './index.less';

type Props = {
  attributes: any;
  children: ReactNode;
  element: any;
};

const Index: FC<Props> = ({ attributes }) => {
  return <div {...attributes}></div>;
}

export default Index;