import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to check if a category has content
function hasContent(categoryPath: string): boolean {
  try {
    const fullPath = path.join(__dirname, 'docs', categoryPath);
    const files = fs.readdirSync(fullPath);
    return files.some(file => file.endsWith('.md'));
  } catch {
    return false;
  }
}

// Build navbar items based on content availability
function buildNavbarItems() {
  const items: any[] = [
    {
      to: '/',
      position: 'left' as const,
      html: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>',
      'aria-label': 'Home',
    },
    // Add Kanban after home icon
    {
      to: '/kanban',
      position: 'left' as const,
      label: 'Kanban',
    },
    // Always include CLI
    {
      to: '/docs/category/cli',
      position: 'left' as const,
      label: 'CLI',
    }
  ];

  // Categories to check for content
  const categories = [
    { path: 'ideas', label: 'Ideas' },
    { path: 'todos', label: 'Todos' },
    { path: 'journal', label: 'Journal' },
    { path: 'workflows', label: 'Workflows' },
    { path: 'diagrams', label: 'Diagrams' },
    { path: 'prompts', label: 'LLM Prompts', categorySlug: 'llm-prompts' },
  ];

  // Add categories that have content
  categories.forEach(category => {
    if (hasContent(category.path)) {
      const slug = category.categorySlug || category.path;
      items.push({
        to: `/docs/category/${slug}`,
        position: 'left' as const,
        label: category.label,
      });
    }
  });

  // Add right-side items
  items.push({
    type: 'search',
    position: 'right',
  });

  return items;
}

const config: Config = {
  title: ' ',
  tagline: 'Your personal knowledge management system',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://localhost',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'your-org',
  projectName: 'scrapbook-md',

  onBrokenLinks: 'warn',
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
          routeBasePath: '/docs',
        },
        blog: false, // Disable blog for now to avoid routing conflicts
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/scrapbook-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      items: buildNavbarItems(),
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark'
      },
      options: {
        maxTextSize: 90000,
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [],
};

export default config;