const pasteIntoInput = (el: HTMLInputElement, text: string) => {
  el.focus();
  if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
    let val = el.value;
    let selStart = el.selectionStart;
    el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
    el.selectionEnd = el.selectionStart = selStart + text.length;
  }
};
export default pasteIntoInput;
