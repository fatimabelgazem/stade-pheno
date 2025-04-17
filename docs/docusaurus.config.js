// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Stade Pheno',
  tagline: 'Détection des stades et prévision de rendement par computer vision et deep learning',
  favicon: 'img/favicon.ico',

  // Mettre à jour les valeurs avec celles de votre compte GitHub
  url: 'https://fatimabelgazem.github.io', // ✅ URL GitHub Pages
  baseUrl: '/stade-pheno/',               // ✅ Nom du projet comme chemin (si nécessaire)

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Mettez à jour ces valeurs avec celles de votre compte
  organizationName: 'fatimabelgazem',     // ✅ Votre utilisateur GitHub
  projectName: 'stade-pheno',             // ✅ Le nom de votre dépôt

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/fatimabelgazem/stade-pheno/tree/main/', // ✅ Mettre à jour le lien d'édition
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/fatimabelgazem/stade-pheno/tree/main/', // ✅ Mettre à jour le lien d'édition
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
          href: 'https://github.com/fatimabelgazem/stade-pheno', // ✅ Mettre à jour le lien GitHub
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
              href: 'https://github.com/fatimabelgazem/stade-pheno', // ✅ Mettre à jour le lien GitHub
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
