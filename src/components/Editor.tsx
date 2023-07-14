
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { intialContent } from './initialContent'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import html from 'highlight.js/lib/languages/xml'
import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode, RxChevronDown, RxChatBubble } from 'react-icons/rx'

import { lowlight } from 'lowlight'
import 'highlight.js/styles/tokyo-night-dark.css'
import BubbleButton from './BubbleButton'


lowlight.registerLanguage('html', html)


const Editor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: intialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
      transformPastedText(text) {
        return text.toUpperCase()
      }
    },
    onUpdate(editor) {
      editor.editor.getJSON()
    }
  })

  return (
    <>
      <EditorContent
        className="max-w-[700px] mx-auto pt-16 prose prose-violet"
        editor={editor} />
      {editor && (
        <FloatingMenu
          className='bg-white gap-1 shadow-xl py-2 px-1 border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col divide-x divide-zinc-200'
          editor={editor} shouldShow={({ state }) => {
            const { $from } = state.selection

            const currentLineText = $from.nodeBefore?.textContent
            return currentLineText === '/'
          }}
        >

          <button
            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100'
            onClick={() => editor.chain().focus().selectTextblockStart().run()}

          >
            <img
              className='w-12 border border-zinc-200 rounded'
              src='https://www.notion.so/images/blocks/text/en-US.png'
              alt='Text'
            />
            <div className='flex flex-col text-left'>
              <span className='text-sm'>Text</span>
              <span className='text-xs text-zinc-400'>Just start writing with plain text.</span>
            </div>
          </button>

          <button
            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100'
          >
            <img
              className='w-12 border border-zinc-200 rounded'
              src='https://www.notion.so/images/blocks/page.83b0bf31.png'
              alt='Page'
            />
            <div className='flex flex-col text-left'>
              <span className='text-sm'>Page</span>
              <span className='text-xs text-zinc-400'>Embed a sub-page inside this page.</span>
            </div>
          </button>

          <button
            className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-100'
            onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}

          >
            <img
              className='w-12 border border-zinc-200 rounded'
              src='https://www.notion.so/images/blocks/page.83b0bf31.png'
              alt='Page'
            />
            <div className='flex flex-col text-left'>
              <span className='text-sm'>Heading 1</span>
              <span className='text-xs text-zinc-400'>Big section heading.</span>
            </div>
          </button>


        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu className='bg-white shadow-xl border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col' editor={editor}>
          <BubbleButton>
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton>
            Comment
            <RxChatBubble className="w-4 h-4" />
          </BubbleButton>

          <div className='flex items-center'>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive('code')}
            >
              <RxCode className="w-4 h-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}

export default Editor