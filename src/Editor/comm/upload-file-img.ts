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

export default (
) => new Promise((r) => {
  const input = document.createElement('input');
  input.style.display = 'none';
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  document.body.appendChild(input);
  input.onchange = async (e) => {
    const base64 = await getUploadImg(e);
    if (!base64) {
      r('');
      return;
    }
    r(base64);
  };
  input.click();
});