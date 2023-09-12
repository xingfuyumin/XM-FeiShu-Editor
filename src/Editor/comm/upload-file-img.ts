import { cloneDeep } from "lodash";
import { BaseEditor, Element } from "slate";
import { ReactEditor } from "slate-react";

const getUploadImg = async (e: any) => {
  const file = e.target.files[0];
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


const handleUpdate = async (e: any, onUpload: (base64: string) => Promise<string> = async () => '', slate: BaseEditor & ReactEditor) => {
  const base64 = await getUploadImg(e);
  console.log(base64);
  if (!base64) {
    return;
  }
  ReactEditor.focus(slate);
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

export default async (onUpload: (base64: string) => Promise<string> = async () => '', slate: BaseEditor & ReactEditor) => {
  const input = document.createElement('input');
  input.style.display = 'none';
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  document.body.appendChild(input);
  input.onchange = async (e) => {
    await handleUpdate(e, onUpload, slate);
    document.body.removeChild(input);
  };
  input.click();
}