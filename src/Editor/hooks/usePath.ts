import { Node } from '../index.d';
import { ReactEditor, useSlate } from 'slate-react';

const DEFAULT_INDENTATION_MAX = 10;

export type ExtraData = {
  indentation: {
    num: number;
    max: number;
  },
  order: {
    num?: number;
    parentStr?: string; 
  },
}

const dealData = (nodes: Node[], slate: any, map: Record<string, ExtraData>) => {
  let index = 0;
  for (const node of nodes) {
    const key = ReactEditor.findKey(slate, node as any)?.id || '';
    if (!map[key]) {
      map[key] = {
        order: {},
        indentation: {
          num: 0,
          max: DEFAULT_INDENTATION_MAX,
        },
      };
    }

    if (node.type === 'Bullet' || node.type === 'Ordered') {
      const lastNode = nodes[index - 1];
      map[key].indentation.num = node.indentation;
      if (lastNode?.type === 'Bullet' || lastNode?.type === 'Ordered') {
        const lastKey = ReactEditor.findKey(slate, lastNode as any)?.id || '';
        map[key].indentation.max = Math.min(map[lastKey].indentation.num + 1, DEFAULT_INDENTATION_MAX);
        map[key].indentation.num = Math.min(map[key].indentation.num, map[key].indentation.max )
      } else {
        map[key].indentation.num = 0;
        map[key].indentation.max = DEFAULT_INDENTATION_MAX;
      }
    }
    if (node.type === 'Ordered') {
      if (!map[key].order) {
        map[key].order = {
          num: 1,
          parentStr: '',
        };
      }
      const lastNode = nodes[index - 1];
      if (lastNode?.type === 'Ordered') {
        const lastKey = ReactEditor.findKey(slate, lastNode as any)?.id || '';
        if (lastNode.indentation === node.indentation) {
          map[key].order.num = (map[lastKey].order.num || 0) + 1;
          map[key].order.parentStr = map[lastKey].order.parentStr || '';
        } else {
          map[key].order.num = 1;
          map[key].order.parentStr = `${map[lastKey].order.parentStr}${map[lastKey].order.parentStr ? '.' : ''}${map[lastKey].order.num}`;
        }
      } else {
        map[key].order.num = 1;
        map[key].order.parentStr = '';
      }
    }

    dealData((node as any)?.children || [], slate, map);
    index += 1;
  }
  return [];
}

export default () => {
  const slate = useSlate();
  const obj: Record<string, ExtraData> = {}
  console.log('计算path', slate);
  dealData(slate.children as any, slate, obj);
  return obj;
}