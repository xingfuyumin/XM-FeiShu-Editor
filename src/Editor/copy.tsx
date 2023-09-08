import React, { useMemo, type FC, useCallback } from 'react';
import { createEditor, Transforms, Element, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    if (isActive) {
      Editor.removeMark(editor, 'bold')
    } else {
      Editor.addMark(editor, 'bold', true)
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    console.log(isActive);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
      // { match: n => Editor.isBlock(editor, n) }
    )
  },
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const CodeElement = props => {
  return (
    <h1 {...props.attributes}>
      <span>{props.children}</span>
    </h1>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      onChange={v => {
        console.log(v);
      }}
    >
      {props.children}
    </span>
  )
}
const Foo: FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    // Add a toolbar with buttons that call the same methods.
    <Slate editor={editor} initialValue={initialValue}
      onChange={value => {
        console.log(value);
      }}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              // CustomEditor.toggleCodeBlock(editor)
              Transforms.setNodes(
                editor,
                { type: 'code' },
                { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
              )
              break
            }

            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
};

export default Foo;
