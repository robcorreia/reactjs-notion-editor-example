import React from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { intialContent } from './initialContent'

const Editor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: intialContent,
  })

  return (
    <EditorContent
      className="max-w-[700px] mx-auto pt-16 prose prose-violet"
      editor={editor} />
  )
}

export default Editor