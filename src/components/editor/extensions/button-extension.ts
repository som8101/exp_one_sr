import { mergeAttributes, Node } from '@tiptap/core'

export interface CustomButtonOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customButton: {
      setCustomButton: (options: { text: string, url: string, loading: boolean }) => ReturnType
    }
  }
}

export const CustomButton = Node.create<CustomButtonOptions>({
  name: 'customButton',
  group: 'inline',
  inline: true,
  selectable: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mx-1 my-1 cursor-default',
        'data-custom-btn': 'true',
        contentEditable: 'false',
      },
    }
  },

  addAttributes() {
    return {
      url: {
        default: '#',
        parseHTML: element => element.getAttribute('data-url'),
        renderHTML: attributes => {
          return {
            'data-url': attributes.url,
          }
        },
      },
      loading: {
        default: false,
        parseHTML: element => element.getAttribute('data-loading') === 'true',
        renderHTML: attributes => {
          return {
            'data-loading': attributes.loading ? 'true' : 'false',
          }
        },
      },
      text: {
        default: 'Button',
        parseHTML: element => element.textContent,
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'button[data-custom-btn="true"]',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['button', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), node.attrs.text]
  },

  addCommands() {
    return {
      setCustomButton:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              url: options.url,
              loading: options.loading,
              text: options.text,
            },
          })
        },
    }
  },
})
