# Copilot Instructions

## Project: Portfolio Website - React + Mantine + i18next

This is a modern multilingual portfolio website built with React, Mantine UI v8, Vite, TypeScript, and i18next for French/English support.

### Key Features
- Mantine v8 for UI components
- i18next for multilingual support (EN/FR)
- Dark/Light theme toggle
- Fully responsive design
- React Router for navigation

### Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Type check with TypeScript
```

### Adding New Pages

1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx` Routes section
3. Update navigation in `src/components/Navbar.tsx`
4. Add translations in `src/locales/en/translation.json` and `fr/translation.json`

### Translation Files

- English: `src/locales/en/translation.json`
- French: `src/locales/fr/translation.json`

To add new translations:
1. Add key to both JSON files
2. Use in components with: `const { t } = useTranslation();` then `t('key.name')`

### Theme Customization

Edit `src/App.tsx` MantineProvider theme object to customize colors, spacing, etc.

### Component Structure

- **Components**: Reusable UI pieces (Navbar, Footer, Hero, Layout)
- **Pages**: Full page components (Home, About, Portfolio, Contact)
- **Locales**: Translation files
- **Styles**: Global CSS and module CSS files

### Notes

- Language preference is saved in localStorage
- Theme preference uses Mantine's color scheme system
- Tabler icons are available via `@tabler/icons-react`
