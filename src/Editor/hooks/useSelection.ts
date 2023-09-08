import { useSlateSelector } from 'slate-react';
import { debounce } from 'lodash';
import { closeTextTool, openTextTool } from '../plugin/text-tool';
import { useEffect } from 'react';
const openTextToolDebounce = debounce(openTextTool, 200);
const closeTextToolDebounce = debounce(closeTextTool, 200);
export default () => {
  const [slate, selectionLen] = useSlateSelector((slate) => {
    return [slate, getSelection()?.toString()?.length];
  });
  useEffect(() => {
    if (selectionLen) {
      const selection = getSelection();
      const range = selection?.rangeCount ? selection?.getRangeAt(0) : undefined;
      const rect = range?.getBoundingClientRect();
      const top = (rect?.top || 0) - 40;
      let left = rect?.left || 0;
      left = Math.max(400, left);
      const width = document.documentElement.clientWidth;
      if (width - left < 400) {
        left = width - 400;
      }
      openTextToolDebounce({
        top,
        left,
        slate,
        close: () => closeTextToolDebounce(slate),
      });
    } else {
      closeTextToolDebounce(slate);
    }
  }, [selectionLen]);
}