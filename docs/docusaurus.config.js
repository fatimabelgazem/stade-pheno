// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stade Pheno',
  tagline: 'Détection des stades et prévision de rendement par computer vision et deep learning',
  favicon: 'img/favicon.ico',

  // ✅ URL GitHub Pages
  url: 'https://fatimabelgazem.github.io',
  baseUrl: '/stade-pheno/',

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // ✅ Infos GitHub
  organizationName: 'fatimabelgazem',
  projectName: 'stade-pheno',

  // 🌍 Internationalisation : Français par défaut + Arabe
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ar'],
    localeConfigs: {
      fr: {
        label: 'Français',
      },
      ar: {
        label: 'العربية',
        direction: 'rtl',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/fatimabelgazem/stade-pheno/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/fatimabelgazem/stade-pheno/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Stade Pheno',
      logo: {
        alt: 'Logo Orange',
        src: 'img/orange.ico',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'localeDropdown', // 🌐 Menu de langue
          position: 'right',
        },
        {
          href: 'https://github.com/fatimabelgazem/stade-pheno',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Documentation', to: '/docs/intro' }],
        },
        {
          title: 'Plus',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/fatimabelgazem/stade-pheno',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stade Pheno.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
