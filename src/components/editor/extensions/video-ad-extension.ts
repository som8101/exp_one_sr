import { Node, mergeAttributes } from '@tiptap/core';

export interface VideoAdOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    videoAd: {
      setVideoAd: (options: { thumbnailUrl: string; title: string; adUrl: string; duration?: string }) => ReturnType;
    };
  }
}

export const VideoAd = Node.create<VideoAdOptions>({
  name: 'videoAd',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      thumbnailUrl: {
        default: '',
      },
      title: {
        default: 'Video',
      },
      adUrl: {
        default: '#',
      },
      duration: {
        default: '10:32',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-video-ad="true"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-video-ad': 'true', class: 'fake-video-ad-placeholder my-8 w-full max-w-[800px] mx-auto bg-black border rounded-xl flex items-center justify-center relative overflow-hidden aspect-video cursor-pointer group shadow-lg hover:shadow-xl transition-all' }), 
      ['img', { src: HTMLAttributes.thumbnailUrl, class: 'absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity' }],
      ['div', { class: 'absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center' }, 
        ['div', { class: 'w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform' },
          ['svg', { width: "28", height: "28", viewBox: "0 0 24 24", fill: "white", xmlns: "http://www.w3.org/2000/svg" }, 
            ['path', { d: "M5 3L19 12L5 21V3Z" }]
          ]
        ]
      ],
      ['div', { class: 'absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded' }, HTMLAttributes.duration],
      ['div', { class: 'absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent' },
        ['h3', { class: 'text-white text-lg font-medium truncate drop-shadow-md' }, HTMLAttributes.title]
      ]
    ];
  },

  addCommands() {
    return {
      setVideoAd:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
