import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Scrapbook',
  tagline: 'Your personal knowledge wiki for ideas, prompts, and todos',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'your-org',
  projectName: 'scrapbook-md',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Use symlinked docs folder
          path: './docs',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Recent Entries',
          blogDescription: 'Latest scrapbook entries',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent entries',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/scrapbook-social-card.jpg',
    navbar: {
      title: 'Scrapbook',
      logo: {
        alt: 'Scrapbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/ideas',
          position: 'left',
          label: '💡 Ideas',
        },
        {
          to: '/prompts',
          position: 'left',
          label: '📝 Prompts',
        },
        {
          to: '/todos',
          position: 'left',
          label: '✅ Todos',
        },
        {
          to: '/journal',
          position: 'left',
          label: '📔 Journal',
        },
        {
          to: '/tags',
          position: 'left',
          label: '🏷️ Tags',
        },
        {
          href: 'https://github.com/your-org/scrapbook-md',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Content',
          items: [
            {
              label: 'Ideas',
              to: '/ideas',
            },
            {
              label: 'Prompts',
              to: '/prompts',
            },
            {
              label: 'Todos',
              to: '/todos',
            },
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'CLI Documentation',
              href: 'https://github.com/your-org/scrapbook-md#cli-usage',
            },
            {
              label: 'Search',
              to: '/search',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Recent Entries',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/your-org/scrapbook-md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Scrapbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Search will be enabled when configured
  } satisfies Preset.ThemeConfig,

  plugins: [],
};

export default config;