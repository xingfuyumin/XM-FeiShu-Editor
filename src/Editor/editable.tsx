import React, { type FC, useCallback, useRef, useState, useMemo } from 'react';
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
import Title from './components/title';
import CodeLine from './components/code-line';
import './index.less';
import { EditableProps } from 'slate-react/dist/components/editable';
import uploadClipboardImg from './comm/upload-clipboard-img';
import NodeClickTool from './plugin/node-click-tool';
import TextTool from './plugin/text-tool';

interface Props extends EditableProps {
  onUpload: (base64: string) => Promise<string>;
}



const Index: FC<Props> = ({
  onUpload,
}) => {
  const [hoverElement, setHoverElement] = useState(null);
  const ref = useRef(null);
  const slate = useSlate();
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'Title':
        return <Title {...props} onHover={setHoverElement} />
      case 'Grid':
        return <Grid {...props} />
      case 'GridColumn':
        return <GridColumn {...props} />
      case 'Text':
        return <Text {...props} onHover={setHoverElement} />
      case 'Bullet':
        return <Bullet {...props} onHover={setHoverElement} />
      case 'Ordered':
        return <Ordered {...props} onHover={setHoverElement} />
      case 'Heading':
        return <Heading {...props} onHover={setHoverElement} />
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
      case 'CodeLine':
        return <CodeLine {...props} />
      default:
        return <Empty {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);
  const onPaste = useCallback((e: any) => {
    uploadClipboardImg(e, onUpload, slate);
  }, []);
  const render = useMemo(() => (
    <Editable
      className="tant-editor-text"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onPaste={onPaste}
    />
  ), [])
  return (
    <div
      className="tant-editor"
      onMouseLeave={() => setHoverElement(null)}
      ref={ref}
    >
      <NodeClickTool
        hoverElement={hoverElement}
        rootDom={ref.current}
        onUpload={onUpload}
      />
      <TextTool
        rootDom={ref.current}
      />
      {render}
    </div>
  );
}

export default Index;
