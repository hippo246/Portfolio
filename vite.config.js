import { defineConfig } from 'vite';

// NOTE: If deploying to a GitHub Pages subfolder (e.g. https://user.github.io/Portfoilio/),
// set the base option to match your repo name:
//   base: '/Portfoilio/',
// Leave it unset (or '/') when deploying to a custom domain root.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        resume: './resume.html',
        homelab: './homelab.html',
        clinicCrm: './clinic-crm.html',
        factoryCrm: './factory-crm.html',
        restaurantCrm: './restaurant-crm.html',
        cafeos: './cafeos.html',
      },
    },
  },
});
