import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Thalos",
  description: "Your Antilope SHIP Provider",
  cleanUrls: true,
  outDir: "dist",
  themeConfig: {
    logo: "/logo-small.svg",

    externalLinkIcon: true,

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
            items: [
                {
                    text: "Introduction",
                    link: '/docs/',
                },
                {
                    text: 'Installation',
                    link: '/docs/installation/',
                    items: [
                        {
                            text: "Package Managers",
                            items: [
                                { text: "Ubuntu/Debian", link: '/docs/installation/debian' },
                            ]
                        },
                        { text: "Bundled binaries", link: '/docs/installation/#bundled-binaries' },
                        { text: "Compiling from source", link: '/docs/installation/#compiling-from-source' },
					    { text: "Docker", link: '/docs/installation/docker' },
                    ]
                },
                {
                    text: 'Configuration',
                    link: '/docs/configuration',
                    items: [
						{
                            text: "Datatypes",
                            link: '/docs/configuration#datatypes'
                        },
                        {
                            text: "Securing redis",
                            link: '/docs/redis/security/',
                            items: [
                                { text: "ACL", link: '/docs/redis/security/acl' },
                            ]
                        },
                    ]
                },
                {
                    text: 'Running the server',
                    link: '/docs/running-the-server',
                }
            ]
        },
        {
            text: 'Architecture',
            items: [
                { text: 'Overview', link: '/docs/architecture/' },
                { text: 'Benchmark', link: '/docs/architecture/benchmark' }
            ]
        },
        {
            text: 'API',
            items: [
                { text: 'Examples', link: '/docs/api/examples' },
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
        copyright: 'Copyright © 2023-2024 Sw/eden'
    }
  },

  markdown: {
    lineNumbers: true
  }
})
