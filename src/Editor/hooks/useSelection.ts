import { useSlate, useSlateSelector } from 'slate-react';
import { cloneDeep, debounce } from 'lodash';
import { closeTextTool, openTextTool } from '../plugin/text-tool';
import { useEffect } from 'react';
import { closeNodeClickTool, openNodeClickTool } from '../plugin/node-click-tool';
const openTextToolDebounce = debounce(openTextTool, 200);
const closeTextToolDebounce = debounce(closeTextTool, 200);
export default () => {
  const slate = useSlate();
  const selectionType = useSlateSelector((slate) => { // 0未选择，1多选，2开头是其他，内容表示单选时节点path
    const selection = slate.selection;
    if (selection) {
      if (JSON.stringify(selection.focus) === JSON.stringify(selection.anchor)) {
        return selection.focus.path.join(',');
      }
      return 1;
    } else {
      return 0;
    }
  });
  useEffect(() => {
    if (selectionType === 0) {
      // 关闭一切
      closeNodeClickTool();
      return;
    }
    if (selectionType === 1) { // 范围选择
      return;
    }
    const path = selectionType.split(',')?.map(d => Number(d)) || [];
    openNodeClickTool(slate, path, closeNodeClickTool);
  }, [selectionType]);
}