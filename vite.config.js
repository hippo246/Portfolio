import { defineConfig } from 'vite';

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
