import { type NavItem, type NavItemFooter } from '@/types';

export const siteConfig = {
  name: 'Rainbox',
  description: 'Later',

  url: 'http://localhost:3000',

  author: 'adityayaduvanshi',
  hostingRegion: 'India',
  keywords: ['Email', 'Next.js', 'SAAS'],
  navItems: [
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Features',
      href: '/features',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'FAQ',
      href: '/faq',
    },
  ] satisfies NavItem[],
  navItemsMobile: [],
  navItemsFooter: [
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Privacy',
          href: '/privacy',
          external: false,
        },
        {
          title: 'Terms',
          href: '/tos',
          external: false,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'FAQ',
          href: '/faq',
          external: false,
        },

        {
          title: 'Contact',
          href: '/contact',
          external: false,
        },
      ],
    },
  ] satisfies NavItemFooter[],
};
