import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Thalos",
  description: "A VitePress Site",
  cleanUrls: true,
  themeConfig: {
    search: {
        provider: 'local'
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/' }
    ],

    sidebar: [
        {
            text: "Getting Started",
            collapsed: true,
            items: [
                {
                    text: 'Installation',
                    link: '/docs/installation/',
                    collapsed: true,
                    items: [
                        {
                            text: "Package Managers",
                            items: [
                                { text: "Ubuntu/Debian", link: '/docs/installation/debian' },
                            ]
                        },
                        { text: "Bundled binaries", link: '/docs/installation/#bundled-binaries' },
                        { text: "Compiling from source", link: '/docs/installation/#compiling-from-source' },
                    ]
                },
                {
                    text: 'Configuration',
                    link: '/docs/configuration'
                }
            ]
        },
        {
            text: 'Architecture',
            collapsed: true,
            items: [
                { text: 'Overview', link: '/docs/architecture/' },
                { text: 'Benchmark', link: '/docs/architecture/benchmark' }
            ]
        },
        {
            text: 'API',
            collapsed: true,
            items: [
                { text: 'Messages', link: '/docs/api/messages' },
                { text: 'Channels', link: '/docs/api/redis-channels' },
                { text: 'Clients', link: '/docs/api/clients' }
            ],
        }
    ],

    socialLinks: [
        { icon: 'github', link: 'https://github.com/eosswedenorg/thalos' }
    ],
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2023 Sw/eden'
    }
  },

  markdown: {
    lineNumbers: true
  }

})
