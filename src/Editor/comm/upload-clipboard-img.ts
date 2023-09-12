import { cloneDeep } from "lodash";
import { BaseEditor, Element } from "slate";
import { ReactEditor } from "slate-react";

const getUploadImg = async (e: any) => {
  const clipboardData = e.clipboardData;
  let file: Blob | null = null;
  for (let i = 0; i < clipboardData.items.length; i++) {
    const item = clipboardData.items[i];
    if (item.type.startsWith('image')) {
      file = item.getAsFile(); // blob中就是截图的文件，获取后可以上传到服务器
      break;
    }
  }
  if (!file) {
    return null;
  }
  const base64: string = await new Promise((resolved, rejected) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = function () {
      resolved(this.result as string);
    };
    reader.onerror = () => {
      rejected('');
    };
  });
  return base64;
};


export default async (e: any, onUpload: (base64: string) => Promise<string> = async () => '', slate: BaseEditor & ReactEditor) => {
  const base64 = await getUploadImg(e);
  if (!base64) {
    return;
  }
  const selection = slate.selection;
  const path = cloneDeep(selection?.focus?.path);
  while (path?.length) {
    const [node] = slate.node(path);
    if (!node) {
      break;
    }
    if (Element.isElement(node)) {
      slate.insertNode({
        type: 'Image',
        src: '',
        loading: true,
        children: [{ text: '' }]
      }, {
        at: path,
      })
      const url = (await onUpload(base64)) || base64;
      slate.setNodes({
        src: url,
        loading: false,
      }, {
        at: path,
      });
      break;
    }
    path.pop();
  }
}