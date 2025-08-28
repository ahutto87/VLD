# Vio La Doula - Development Guide

## Quick Start Development

```bash
# Navigate to project directory
cd /home/ahutt/VLD_Website/VLD

# Start development server (automated script)
./dev.sh

# OR manual method:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v20.19.3
npm run dev
```

**Development URL:** http://localhost:5173/

## Making Content Changes

### Updating Pricing & Services
- **File:** `/src/i18n/locales/en.json` (English)
- **File:** `/src/i18n/locales/es.json` (Spanish)
- **Section:** `"services"` object
- Changes show **immediately** in browser during development

### Updating About Section
- **File:** `/src/components/About.tsx`
- **Translations:** `/src/i18n/locales/en.json` → `"about"` object

### Adding/Removing Testimonials
- **File:** `/src/components/About.tsx`
- Look for `testimonials` array (currently removed)

### Other Content
- **Hero Section:** `/src/components/Hero.tsx` + translation files
- **Contact Info:** `/src/components/Contact.tsx` + translation files
- **HypnoBirthing®:** `/src/components/HypnobirthingForm.tsx` + translation files

## Commands Reference

```bash
# Development (live reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Troubleshooting

### Changes not showing?
1. **Hard refresh:** `Ctrl+F5` or `Cmd+Shift+R`
2. **Clear browser cache** for localhost
3. **Try incognito/private mode**
4. **Restart dev server:** Stop with `Ctrl+C`, run `./dev.sh` again

### Node.js version issues?
- **Required:** Node.js 20.19.0+ 
- **Use:** `nvm use v20.19.3`
- **Check:** `node --version`

## File Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section
│   ├── Services.tsx    # Pricing packages
│   ├── Contact.tsx     # Contact form & info
│   └── ...
├── i18n/
│   └── locales/
│       ├── en.json     # English translations
│       └── es.json     # Spanish translations
└── ...
```

## Important Notes

- **Never commit** `/dist/` or `/assets/` folders to git
- **Translation files** control most content
- **Changes are immediate** during development
- **No caching issues** with this clean setup
- **Always use correct Node.js version** (v20.19.3)