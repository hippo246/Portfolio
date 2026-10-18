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

// Certificate lightbox
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalClose = document.querySelector('.cert-modal-close');
const certModalBackdrop = document.querySelector('.cert-modal-backdrop');

function openCertModal(src, title, alt) {
  certModalImg.src = src;
  certModalImg.alt = alt || title;
  certModalTitle.textContent = title;
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  certModalClose.focus();
  // Reset zoom when opening new image
  resetZoom();
}

function closeCertModal() {
  certModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  certModalImg.src = '';
  // Reset zoom when closing
  resetZoom();
}

// Zoom functionality
let currentZoom = 1;
let naturalWidth = 0;
let naturalHeight = 0;
const minZoom = 0.25;
const maxZoom = 5;

function updateZoom() {
  const newWidth = naturalWidth * currentZoom;
  const newHeight = naturalHeight * currentZoom;
  certModalImg.style.width = `${newWidth}px`;
  certModalImg.style.height = `${newHeight}px`;
  certModalImg.style.maxWidth = 'none';
  certModalImg.style.maxHeight = 'none';
  document.getElementById('zoomLevel').textContent = `${Math.round(currentZoom * 100)}%`;
}

function zoomIn() {
  if (currentZoom < maxZoom) {
    currentZoom = Math.min(currentZoom * 1.25, maxZoom);
    updateZoom();
  }
}

function zoomOut() {
  if (currentZoom > minZoom) {
    currentZoom = Math.max(currentZoom / 1.25, minZoom);
    updateZoom();
  }
}

function resetZoom() {
  currentZoom = 1;
  imgWrapper.scrollLeft = 0;
  imgWrapper.scrollTop = 0;
  updateZoom();
}

// Pan functionality
let isPanning = false;
let startX, startY, scrollLeft, scrollTop;

const imgWrapper = document.getElementById('certModalImgWrapper');

if (imgWrapper) {
  // Store natural dimensions when image loads
  certModalImg.addEventListener('load', () => {
    naturalWidth = certModalImg.naturalWidth;
    naturalHeight = certModalImg.naturalHeight;
    updateZoom();
  });

  imgWrapper.addEventListener('mousedown', (e) => {
    if (currentZoom > 1) {
      isPanning = true;
      imgWrapper.style.cursor = 'grabbing';
      startX = e.pageX - imgWrapper.offsetLeft;
      startY = e.pageY - imgWrapper.offsetTop;
      scrollLeft = imgWrapper.scrollLeft;
      scrollTop = imgWrapper.scrollTop;
    }
  });

  imgWrapper.addEventListener('mouseleave', () => {
    isPanning = false;
    imgWrapper.style.cursor = currentZoom > 1 ? 'grab' : 'default';
  });

  imgWrapper.addEventListener('mouseup', () => {
    isPanning = false;
    imgWrapper.style.cursor = currentZoom > 1 ? 'grab' : 'default';
  });

  imgWrapper.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const x = e.pageX - imgWrapper.offsetLeft;
    const y = e.pageY - imgWrapper.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    imgWrapper.scrollLeft = scrollLeft - walkX;
    imgWrapper.scrollTop = scrollTop - walkY;
  });
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

  // Open lightbox on any clickable image: cert cards, lab images, project screenshots, homelab screenshots
  document.querySelectorAll('.lab-test-img, .lab-inline-img, .pt-lab-img, .project-screenshot-img, .homelab-live-screenshot').forEach(item => {
    if (item.classList.contains('pt-lab-img--none')) return;
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const title = item.dataset.certTitle
        || item.closest('.project-screenshot-item')?.querySelector('.project-screenshot-caption')?.textContent.trim()
        || item.closest('.homelab-live-screenshot')?.querySelector('.homelab-screenshot-caption')?.textContent.trim()
        || img.alt
        || '';
      openCertModal(img.src, title, img.alt);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certModal.hasAttribute('hidden')) {
      closeCertModal();
    }
  });

  // Zoom controls
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const zoomResetBtn = document.getElementById('zoomReset');

  if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

  // Zoom with keyboard
  document.addEventListener('keydown', (e) => {
    if (!certModal.hasAttribute('hidden')) {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    }
  });

  // Zoom with mouse wheel
  if (imgWrapper) {
    imgWrapper.addEventListener('wheel', (e) => {
      if (!certModal.hasAttribute('hidden')) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    });
  }
}

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Project category filter
const filterBtns = document.querySelectorAll('.projects-filter-btn');
const projectCards = document.querySelectorAll('.projects-grid .project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
