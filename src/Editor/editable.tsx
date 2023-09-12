import React, { type FC, useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';
import Grid from './components/grid';
import GridColumn from './components/grid-column';
import Empty from './components/empty';
import Text from './components/text';
import Bullet from './components/bullet';
import Ordered from './components/ordered';
import Leaf from './components/leaf';
import Heading from './components/heading';
import Callout from './components/callout';
import Tabs from './components/tabs';
import TabPane from './components/tab-pane';
import Image from './components/image';
import Tip from './components/tip';
import Warning from './components/warning';
import Danger from './components/danger';
import Quote from './components/quote';
import Divider from './components/divider';
import Code from './components/code';
import Table from './components/table';
import TableCell from './components/table-cell';
import './index.less';
import { EditableProps } from 'slate-react/dist/components/editable';
import useSelection from './hooks/useSelection';
import uploadClipboardImg from './comm/upload-clipboard-img';

interface Props extends EditableProps {
  onUpload: (base64: string) => Promise<string>;
}



const Index: FC<Props> = ({
  onUpload,
}) => {
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'Grid':
        return <Grid {...props} />
      case 'GridColumn':
        return <GridColumn {...props} />
      case 'Text':
        return <Text {...props} />
      case 'Bullet':
        return <Bullet {...props} />
      case 'Ordered':
        return <Ordered {...props} />
      case 'Heading':
        return <Heading {...props} />
      case 'Callout':
        return <Callout {...props} />
      case 'Tabs':
        return <Tabs {...props} />
      case 'TabPane':
        return <TabPane {...props} />
      case 'Image':
        return <Image {...props} />
      case 'Tip':
        return <Tip {...props} />
      case 'Warning':
        return <Warning {...props} />
      case 'Danger':
        return <Danger {...props} />
      case 'Divider':
        return <Divider {...props} />
      case 'Quote':
        return <Quote {...props} />
      case 'Table':
        return <Table {...props} />
      case 'TableCell':
        return <TableCell {...props} />
      case 'Code':
        return <Code {...props} />
      default:
        return <Empty {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);
  const slate = useSlate();
  useSelection();
  return (
    <>
      <Editable
        className="tant-editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onPaste={e => uploadClipboardImg(e, onUpload, slate)}
      />
      {/* <Button onClick={() => uploadFileImg(onUpload, slate)} >测试</Button> */}
    </>
  );
}

export default Index;
