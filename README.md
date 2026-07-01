# Portfolio Website - React + Mantine + i18next

A modern, multilingual portfolio website built with React, Mantine UI v8, and internationalization support for French and English.

## Features

- 🎨 **Mantine v8 UI Library** - Beautiful, modern components
- 🌍 **Multilingual Support** - French and English (i18next)
- 🌓 **Dark/Light Theme** - Theme switcher
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Vite** - Fast build tool and dev server
- 📄 **Pages Included**:
  - Home (Hero section)
  - About (Skills showcase)
  - Portfolio (Projects gallery)
  - Contact (Form)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will open at http://localhost:3000

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── Layout.tsx
├── pages/            # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   └── Contact.tsx
├── locales/          # i18next translations
│   ├── en/translation.json
│   └── fr/translation.json
├── styles/           # Global styles
├── App.tsx           # Main app component
└── i18n.ts          # i18next configuration
```

## Language Switching

Click the globe icon in the navbar to switch between English and French. The preference is saved to localStorage.

## Theme Switching

Click the sun/moon icon in the navbar to toggle between light and dark themes.

## Customization

### Update Content

Edit translation files:
- `src/locales/en/translation.json` - English
- `src/locales/fr/translation.json` - French

### Modify Colors

Edit the Mantine theme in `src/App.tsx`:
```typescript
theme={{
  primaryColor: 'violet',
  // Customize colors here
}}
```

### Add New Pages

1. Create a new file in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

## Dependencies

- **react** - UI library
- **@mantine/core** - Component library
- **i18next** - Internationalization
- **react-router-dom** - Client routing
- **@tabler/icons-react** - Icons

## License

MIT
