import { BaseEditor, Element, Location, MaximizeMode, Node, NodeAncestorsOptions, NodeMatch, Path, PropsCompare, PropsMerge } from "slate";
import { ReactEditor } from "slate-react";
import { DOMNode } from "slate-react/dist/utils/dom";
import { NodeInsertNodesOptions } from "slate/dist/interfaces/transforms/node";

export const findPath = (slate: BaseEditor & ReactEditor, element: Element) => {
  try {
    return ReactEditor.findPath(slate, element);
  } catch (err) {
    console.error('findPath', element, err);
    return [];
  }
}

export const setNodes: <T extends Node>(slate: BaseEditor & ReactEditor, props: Partial<T>, options?: {
  at?: Location;
  match?: NodeMatch<T>;
  mode?: MaximizeMode;
  hanging?: boolean;
  split?: boolean;
  voids?: boolean;
  compare?: PropsCompare;
  merge?: PropsMerge;
}) => void = (slate, props, options) => {
  try {
    slate.setNodes(props, options);
  } catch (err) {
    console.error('setNodes', props, options, err);
  }
}

export const insertNode: <T extends Node>(slate: BaseEditor & ReactEditor, node: Node, options?: NodeInsertNodesOptions<T>) => Node | undefined = (slate, node, options) => {
  try {
    slate.insertNode(node, options);
    return slate.node(options?.at || [])?.[0];
  } catch (err) {
    console.error('insertNode', node, options, err);
  }
}

export const unsetNodes: <T extends Node>(slate: BaseEditor & ReactEditor, props: string | string[], options?: {
  at?: Location;
  match?: NodeMatch<T>;
  mode?: MaximizeMode;
  hanging?: boolean;
  split?: boolean;
  voids?: boolean;
}) => void = (slate, props, options) => {
  try {
    slate.unsetNodes(props, options);
  } catch (err) {
    console.error('unsetNodes', props, options, err);
  }
}

export const findParent = (slate: BaseEditor & ReactEditor, path: number[]) => {
  try {
    return slate.parent(path);
  } catch (err) {
    console.error('findParent', path, err);
    return [];
  }
}

export const toSlateNode = (slate: BaseEditor & ReactEditor, domNode: DOMNode) => {
  try {
    return ReactEditor.toSlateNode(slate, domNode);
  } catch (err) {
    console.error('toSlateNode', domNode, err);
    return [];
  }
}

export const toDOMNode = (slate: BaseEditor & ReactEditor, node: Node) => {
  try {
    return ReactEditor.toDOMNode(slate, node);
  } catch (err) {
    console.error('toDOMNode', node, err);
    return [];
  }
}

export const ancestors = (root: Node, path: Path, options?: NodeAncestorsOptions) => {
  try {
    return Array.from(Node.ancestors(root, path, options));
  } catch (err) {
    console.error('ancestors', root, path, options, err);
    return [];
  }
}
export const select = (slate: BaseEditor & ReactEditor, target: Location) => {
  try {
    return slate.select(target);
  } catch (err) {
    console.error('select', target, err);
    return [];
  }
}