import { BaseEditor, Editor } from "slate"
import { ReactEditor } from "slate-react"
import { FontBackgroundColor, FontColor, Link } from "./typing";


export const isBold = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.bold;
}
export const isItalic = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.italic;
}
export const isStrikethrough = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.strikethrough;
}
export const isUnderline = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.underline;
}
export const isInlineCode = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.inline_code;
}
export const isSelection = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return !!marks?.selection;
}
export const getBgColor = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return marks?.background_color || 0;
}
export const getTextColor = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return marks?.text_color || 0;
}
export const getLink = (editor: BaseEditor & ReactEditor) => {
  const marks = Editor.marks(editor)
  return marks?.link;
}

export const handleBold = (editor: BaseEditor & ReactEditor) => {
  const isActive = isBold(editor)
  if (isActive) {
    Editor.removeMark(editor, 'bold')
  } else {
    Editor.addMark(editor, 'bold', true)
  }
}
export const handleItalic = (editor: BaseEditor & ReactEditor) => {
  const isActive = isItalic(editor)
  if (isActive) {
    Editor.removeMark(editor, 'italic')
  } else {
    Editor.addMark(editor, 'italic', true)
  }
}
export const handleStrikethrough = (editor: BaseEditor & ReactEditor) => {
  const isActive = isStrikethrough(editor)
  if (isActive) {
    Editor.removeMark(editor, 'strikethrough')
  } else {
    Editor.addMark(editor, 'strikethrough', true)
  }
}
export const handleUnderline = (editor: BaseEditor & ReactEditor) => {
  const isActive = isUnderline(editor)
  if (isActive) {
    Editor.removeMark(editor, 'underline')
  } else {
    Editor.addMark(editor, 'underline', true)
  }
}
export const handleInlineCode = (editor: BaseEditor & ReactEditor) => {
  const isActive = isInlineCode(editor)
  if (isActive) {
    Editor.removeMark(editor, 'inline_code')
  } else {
    Editor.addMark(editor, 'inline_code', true)
  }
}
export const handleSelection = (editor: BaseEditor & ReactEditor) => {
  const isActive = isSelection(editor);
  if (isActive) {
    Editor.removeMark(editor, 'selection')
  } else {
    Editor.addMark(editor, 'selection', true)
  }
}
export const handleBgColor = (editor: BaseEditor & ReactEditor, value: FontBackgroundColor) => {
  Editor.addMark(editor, 'background_color', value);
}
export const handleTextColor = (editor: BaseEditor & ReactEditor, value: FontColor) => {
  Editor.addMark(editor, 'text_color', value);
}
export const handleLink = (editor: BaseEditor & ReactEditor, value: Link) => {
  Editor.addMark(editor, 'text_color', value);
}