# More Budućnosti / FutureSea

**More Budućnosti** (FutureSea) is a project aimed at transferring knowledge and raising awareness about the importance of the ocean for life on Earth among school-age children. The project is co-financed by the Adris Foundation and implemented by the Institute of Oceanography and Fisheries.

🌐 **Website**: [https://futuresea.eu](https://futuresea.eu)

## About the Project

The project focuses on ocean literacy education in Croatia, providing educational resources, workshops, and materials for schools and educators. Through interactive content and practical presentations, we aim to increase understanding of ocean conservation and its importance for future generations.

## Technical Stack

- **Framework**: [Astro](https://astro.build/) v5.14.1
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4
- **CMS**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Icons**: [Astro Icon](https://www.astroicon.dev/) with Iconify
- **Deployment**: Netlify
- **Node Version**: 18+

## Features

- ✅ **Astro v5** - Latest stable version with modern features
- ✅ **Ocean Literacy Blog** - Educational content with MDX support
- ✅ **Image Optimization** - Built-in Astro assets for fast loading
- ✅ **Dark Mode** - Full dark mode support via Tailwind CSS
- ✅ **SEO Optimized** - Custom meta tags, Open Graph, and Twitter Cards
- ✅ **Decap CMS** - Content management with GitHub OAuth
- ✅ **RSS Feed** - Automatic feed generation for blog posts
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Fast Performance** - Optimized for speed and accessibility

## Project Structure

```
/
├── data/
│   └── blog/              # Blog posts in Markdown/MDX
├── public/
│   ├── admin/             # Decap CMS admin interface
│   │   ├── index.html
│   │   └── config.yml
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── images/        # Optimized images
│   │   └── styles/
│   ├── components/
│   │   ├── atoms/         # Small reusable components
│   │   ├── blog/          # Blog-specific components
│   │   ├── core/          # Core UI components
│   │   └── widgets/       # Larger UI sections
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes and pages
│   └── utils/             # Utility functions
├── astro.config.mjs       # Astro configuration
├── tailwind.config.cjs    # Tailwind configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.14.1 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/dariafuturesea/futuresea.git
cd futuresea

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Commands

| Command               | Action                                             |
| :-------------------- | :------------------------------------------------- |
| `npm install`         | Install dependencies                               |
| `npm run dev`         | Start local dev server at `localhost:4321`         |
| `npm run build`       | Build production site to `./dist/`                 |
| `npm run preview`     | Preview build locally before deploying             |
| `npm run format`      | Format code with Prettier                          |
| `npm run lint:eslint` | Run ESLint                                         |

## Content Management

This project uses **Decap CMS** with GitHub OAuth for content management.

### Accessing the CMS

1. Navigate to [https://futuresea.eu/admin/](https://futuresea.eu/admin/)
2. Click "Login with GitHub"
3. Authorize the application
4. Start editing content!

### CMS Setup

For detailed setup instructions, see [DECAP.md](./DECAP.md)

**Quick setup:**
1. Create a GitHub OAuth app
2. Add OAuth provider in Netlify (Site Settings → Access control → OAuth)
3. Access CMS at `/admin/`

## Configuration

Basic site configuration is in `src/config.mjs`:

```javascript
export const SITE = {
  name: 'FutureSea',
  origin: 'https://futuresea.eu',
  basePathname: '/',
  trailingSlash: false,
  title: 'More budućnosti…',
  description: '…je projekt koji za cilj ima prijenos znanja i jačanje svijesti o važnosti oceana za život na Zemlji kod djece školskog uzrasta.',
  googleAnalyticsId: "G-51MGD17LC3",
};
```

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the `main` branch.

### Environment Variables

No environment variables are required for basic functionality. Google Analytics is configured in `src/config.mjs`.

### Build Settings (Netlify)

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## Recent Updates

### Astro v5 Migration (October 2024)

Successfully migrated from Astro v1.8 to v5.14.1:
- Replaced deprecated `@astrojs/image` with `astro:assets`
- Updated all integrations to v5-compatible versions
- Migrated from `@astrolib/seo` to custom SEO implementation
- Updated icon system to `astro-icon` v1.1.5
- Fixed Netlify build image optimization issues

See the [upgrade/astro-v5 branch](https://github.com/dariafuturesea/futuresea/tree/upgrade/astro-v5) for migration details.

## Contributing

This project is maintained by the Institute of Oceanography and Fisheries. For contributions or suggestions, please contact the project team.

## Project Partners

- **Adris Foundation** - Project co-financing through the Creativity, Ecology, Heritage and Kindness Program
- **Institute of Oceanography and Fisheries** - Project implementation
- **UN Ocean Decade** - Supporting the Decade of Ocean Science for Sustainable Development (2021-2030)

## License

This project is developed for educational purposes as part of the FutureSea initiative.

## Contact

For more information about the project, visit [https://futuresea.eu](https://futuresea.eu)

---

Built with [Astro](https://astro.build/) 🚀
