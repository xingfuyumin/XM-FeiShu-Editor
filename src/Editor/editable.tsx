import React, { type FC, useCallback } from 'react';
import { Editable } from 'slate-react';
import Grid from './components/grid';
import GridColumn from './components/grid-column';
import Empty from './components/empty';
import Text from './components/text';
import Bullet from './components/bullet';
import Ordered from './components/ordered';
import Leaf from './components/leaf';
import Heading from './components/heading';
import Callout from './components/callout';
import './index.less';
import { EditableProps } from 'slate-react/dist/components/editable';
import useSelection from './hooks/useSelection';

const Index: FC<EditableProps> = () => {
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'Grid':
        return <Grid {...props}/>
      case 'GridColumn':
        return <GridColumn {...props} />
      case 'Text':
        return <Text {...props} />
      case 'Bullet':
        return <Bullet {...props}/>
      case 'Ordered':
        return <Ordered {...props}/>
      case 'Heading':
        return <Heading {...props} />
        case 'Callout':
          return <Callout {...props} />
      default:
        return <Empty {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);
  useSelection();
  return (
    <Editable
      className="tant-editor"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
    />
  );
}

export default Index;
