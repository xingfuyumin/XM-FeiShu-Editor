import { useSlate } from 'slate-react';
import { handleNodeClickTool } from '../plugin/node-click-tool/index'
import { useRef, useState, useEffect } from 'react';
export default (element: any) => {
  // const slate = useSlate();
  const [focus, setFocus] = useState(false);
  // const [state, setState] = useState({ element: null, dom: null, open: false });
  const ref = useRef(null);
  // const timerRef = useRef(0);



  // useEffect(() => {
  //   const dom = ref.current as any;
  //   if (dom) {
  //     dom.onmouseenter = (e: any) => {
  //       if (timerRef.current) {
  //         clearTimeout(timerRef.current);
  //         timerRef.current = 0;
  //       }
  //       setState()
  //     }handleNodeClickTool(slate, element, setFocus, e.target, true);
  //     dom.onmouseleave = (e: any) => handleNodeClickTool(slate, element, setFocus, e.target, false);
  //   }
  // });
  return {
    ref,
    'data-focus': focus,
    onMouseEnter: () => {
      // console.log(1)
    },
    onMouseLeave: () => {
      // console.log(2)
    }
  }
}