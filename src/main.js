// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Smooth scroll for anchor links (fallback for browsers that don't support CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 70; // Account for sticky nav
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

if (sections.length > 0 && navLinks.length > 0) {
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better UX

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Section entrance fade-in via IntersectionObserver
(function () {
  // Skip if browser doesn't support it or user prefers reduced motion
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('is-visible'));
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.07,       // trigger when 7% of section is visible
      rootMargin: '0px 0px -40px 0px'  // slight bottom offset so it fires just before reaching it
    }
  );

  document.querySelectorAll('.section').forEach(section => {
    // Home section is always visible — skip it
    if (section.classList.contains('home')) {
      section.classList.add('is-visible');
      return;
    }
    // Sub-pages with only one section: make it visible immediately
    if (document.querySelectorAll('.section').length === 1) {
      section.classList.add('is-visible');
      return;
    }
    sectionObserver.observe(section);
  });
})();

// Certificate lightbox
const certModal = document.getElementById('certModal');
const certModalImg = certModal && certModal.querySelector('.cert-modal-img');
const certModalTitle = certModal && certModal.querySelector('.cert-modal-title');
const certModalClose = certModal && certModal.querySelector('.cert-modal-close');
const certModalBackdrop = certModal && certModal.querySelector('.cert-modal-backdrop');

function openCertModal(src, title, alt) {
  certModalImg.src = src;
  certModalImg.alt = alt || title;
  certModalTitle.textContent = title;
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  certModalClose.focus();
}

function closeCertModal() {
  certModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  certModalImg.src = '';
}

if (certModal) {
  // Open on card click or Enter/Space keypress
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      openCertModal(
        card.dataset.cert,
        card.dataset.certTitle,
        card.querySelector('img')?.alt
      );
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(
          card.dataset.cert,
          card.dataset.certTitle,
          card.querySelector('img')?.alt
        );
      }
    });
  });

  certModalClose.addEventListener('click', closeCertModal);
  certModalBackdrop.addEventListener('click', closeCertModal);

  // Also open on lab result and pt-lab-img clicks
  document.querySelectorAll('.lab-test-img, .lab-inline-img, .pt-lab-img').forEach(item => {
    if (item.classList.contains('pt-lab-img--none')) return;
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const title = item.dataset.certTitle || img.alt || '';
      openCertModal(img.src, title, img.alt);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certModal.hasAttribute('hidden')) {
      closeCertModal();
    }
  });
}
