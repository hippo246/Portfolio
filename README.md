# IT & Cybersecurity Portfolio

A minimal, professional portfolio website for an aspiring IT and cybersecurity professional.

## Features

- ✅ Six main sections: Home, Cybersecurity, Homelab, Projects, Résumé, Contact
- ✅ Minimal, professional design with light/dark theme support
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Accessible navigation and keyboard support
- ✅ Fast loading with vanilla HTML/CSS/JS
- ✅ No fake certifications, invented labs, or exaggerated claims
- ✅ Honest representation of skills and learning journey

## Quick Start

### Development
```bash
npm install
npm run dev
```
Visit http://localhost:5173

### Production Build
```bash
npm run build
```
Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
.
├── index.html          # Main HTML with all sections
├── src/
│   ├── style.css       # All styling with CSS variables
│   └── main.js         # Navigation and interaction logic
├── public/
│   └── Resume.pdf      # Your résumé
├── package.json        # Dependencies and scripts
├── VERIFICATION_STATUS.md  # Internal verification checklist
└── README.md          # This file
```

## Customization

### Updating Content

All content is in `index.html`. Simply edit the text in each section:

- **Home:** Update your introduction and technical highlights
- **Cybersecurity:** Add completed labs or update learning roadmap
- **Homelab:** Add troubleshooting case studies
- **Projects:** Update project descriptions and add new projects
- **Résumé:** Add certifications and learning progress
- **Contact:** Add your email (currently showing "available upon request")

### Résumé

✅ **Already added:** Resume.pdf is in the `public/` folder and linked in both the Home and Résumé sections.

To update the résumé:
1. Replace `public/Resume.pdf` with your new file
2. Keep the same filename or update the links in `index.html`

### Changing Colors

Edit CSS variables in `src/style.css`:

```css
:root {
  --accent: #0d6efd;        /* Primary accent color */
  --accent-hover: #0b5ed7;  /* Hover state */
  --accent-light: #e7f1ff;  /* Light accent background */
  /* ... other variables */
}
```

### Adding Project Screenshots

1. Create a `public/` directory
2. Add your screenshots there
3. Reference them in project cards:
```html
<img src="/project-screenshot.jpg" alt="Project Screenshot" class="project-image">
```

Add to CSS:
```css
.project-image {
  width: 100%;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}
```

## Design Principles

This portfolio follows strict anti-hallucination rules:

- ❌ No fabricated certifications or employment history
- ❌ No invented cybersecurity achievements
- ❌ No fake networking labs or CTF results
- ❌ No unverified project features
- ❌ No invented metrics, customers, or testimonials
- ✅ Honest distinction between interests, learning, and experience
- ✅ Clear labeling of planned vs. implemented features
- ✅ Acknowledgment of AI-assisted development where applicable

## Deployment

### Netlify
1. Run `npm run build`
2. Drag and drop the `dist/` folder to Netlify

### Vercel
1. Push to GitHub
2. Import repository in Vercel
3. Deploy

### GitHub Pages
1. Run `npm run build`
2. Install `gh-pages`: `npm install -g gh-pages`
3. Deploy: `gh-pages -d dist`

## Verification

See `VERIFICATION_STATUS.md` for:
- What has been verified
- What information is still needed
- Anti-hallucination compliance checklist
- Testing performed

## Technologies

- **Build Tool:** Vite 8.3.4
- **Styling:** Custom CSS with CSS variables
- **JavaScript:** Vanilla ES6+ (no frameworks)
- **Features:** Responsive design, dark mode, smooth scrolling

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Personal portfolio. Not for redistribution.

---

**Note:** This portfolio is designed to grow with your skills. Update it as you complete labs, earn certifications, and build projects. The structure makes it easy to add evidence of your work without rebuilding the entire site.
# Portfolio
