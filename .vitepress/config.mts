import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/my-docs/",
  title: "无限进步",
  description: "orange的学习文档",
  head: [
    ["link", { rel: "icon", href: "/my-docs/logo.jpg" }],
  ],
  themeConfig: {
    logo: '/logo.jpg',
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    outlineTitle: "文章目录",
    outline: [2, 6],
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '前端面试题',
        items: [
          { text: 'HTML+CSS 题目', link: '/front-end/html+css/question' },
          { text: 'JavaScript 题目', link: '/front-end/js/question' },
          { text: 'TypeScript 题目', link: '/front-end/ts/question' },
          { text: '计算机网络 题目', link: '/front-end/http/question' },
        ]
      },
      {
        text: '微信小程序',
        items: [
          { text: '对比图', link: '/front-end/wx/comparisonChart' },
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: "无限进步",
      copyright: "Copyright © 2025-present orange",
    },
  }
})
