"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading2, Quote, MousePointerClick } from "lucide-react";
import { MediaPicker } from "@/components/media/media-picker";
import { useEffect } from "react";
import { CustomButton } from "./extensions/button-extension";

type TiptapEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap gap-1 items-center">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-1" />
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        aria-label="Toggle heading"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-1" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Toggle blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("customButton")}
        onPressedChange={() => {
          const text = window.prompt('Button text (e.g. "Buy Now"):');
          if (!text) return;
          const url = window.prompt('Button link URL (e.g. "https://example.com"):');
          if (!url) return;
          const loading = window.confirm('Show loading spinner when clicked? (OK = Yes, Cancel = No)');
          editor.chain().focus().setCustomButton({ text, url, loading }).run();
        }}
        aria-label="Add Button"
      >
        <MousePointerClick className="h-4 w-4" />
      </Toggle>
      <div className="w-px h-6 bg-border mx-1" />
      <MediaPicker 
        onSelect={(url) => {
          editor.chain().focus().setImage({ src: url }).insertContent('<p></p>').run();
        }} 
      />
    </div>
  );
};

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md border my-4 max-w-full h-auto",
        },
      }),
      CustomButton,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[250px] p-4 border border-t-0 border-input rounded-b-md bg-background max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <div className="w-full flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
