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

// Dynamically inject Next & Previous buttons into cert-modal if not present
if (certModal) {
  const modalContent = certModal.querySelector('.cert-modal-content');
  if (modalContent && !document.getElementById('certModalPrev')) {
    const prevBtn = document.createElement('button');
    prevBtn.id = 'certModalPrev';
    prevBtn.className = 'cert-modal-nav-btn cert-modal-prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.setAttribute('title', 'Previous (Left Arrow)');
    prevBtn.innerHTML = '‹';
    prevBtn.style.display = 'none';

    const nextBtn = document.createElement('button');
    nextBtn.id = 'certModalNext';
    nextBtn.className = 'cert-modal-nav-btn cert-modal-next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.setAttribute('title', 'Next (Right Arrow)');
    nextBtn.innerHTML = '›';
    nextBtn.style.display = 'none';

    modalContent.appendChild(prevBtn);
    modalContent.appendChild(nextBtn);
  }
}

// Active gallery item tracking
let activeGallery = [];
let activeIndex = -1;

function updateModalNavButtons() {
  const prevBtn = document.getElementById('certModalPrev');
  const nextBtn = document.getElementById('certModalNext');
  if (!prevBtn || !nextBtn) return;

  if (activeGallery.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }
  prevBtn.style.display = 'flex';
  nextBtn.style.display = 'flex';
  prevBtn.disabled = activeIndex <= 0;
  nextBtn.disabled = activeIndex >= activeGallery.length - 1;
}

function openCertModal(src, title, alt, gallery = [], index = -1) {
  certModalImg.src = src;
  certModalImg.alt = alt || title;
  certModalTitle.textContent = title;
  certModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  certModalClose.focus();

  activeGallery = gallery.length ? gallery : [{ src, title, alt }];
  activeIndex = index >= 0 ? index : activeGallery.findIndex(item => item.src === src);
  if (activeIndex === -1) activeIndex = 0;

  updateModalNavButtons();

  // If image is already cached/complete in memory
  if (certModalImg.complete && certModalImg.naturalWidth) {
    naturalWidth = certModalImg.naturalWidth;
    naturalHeight = certModalImg.naturalHeight;
    resetZoom();
  }
}

function navigateModal(direction) {
  if (activeGallery.length <= 1) return;
  const newIndex = activeIndex + direction;
  if (newIndex >= 0 && newIndex < activeGallery.length) {
    activeIndex = newIndex;
    const item = activeGallery[activeIndex];
    certModalImg.src = item.src;
    certModalImg.alt = item.alt || item.title;
    certModalTitle.textContent = item.title;
    updateModalNavButtons();
    if (certModalImg.complete && certModalImg.naturalWidth) {
      naturalWidth = certModalImg.naturalWidth;
      naturalHeight = certModalImg.naturalHeight;
      resetZoom();
    }
  }
}

function closeCertModal() {
  certModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  certModalImg.src = '';
  naturalWidth = 0;
  naturalHeight = 0;
  activeGallery = [];
  activeIndex = -1;
  resetZoom();
}

// Zoom functionality
let currentZoom = 1;
let naturalWidth = 0;
let naturalHeight = 0;
const minZoom = 0.1;
const maxZoom = 5;

const imgWrapper = document.getElementById('certModalImgWrapper');

function calculateFitZoom() {
  if (!imgWrapper || !naturalWidth || !naturalHeight) return 1;

  // Compute available space inside the image wrapper (accounting for padding)
  const wrapperWidth = imgWrapper.clientWidth || (window.innerWidth * 0.85);
  const wrapperHeight = imgWrapper.clientHeight || (window.innerHeight * 0.7);
  const paddingX = 32;
  const paddingY = 32;

  const availW = Math.max(wrapperWidth - paddingX, 100);
  const availH = Math.max(wrapperHeight - paddingY, 100);

  const scaleW = availW / naturalWidth;
  const scaleH = availH / naturalHeight;

  // Fit inside wrapper; don't upscale tiny icons beyond 100%
  const fitScale = Math.min(scaleW, scaleH);
  return Math.min(fitScale, 1);
}

function updateZoom() {
  if (!naturalWidth || !naturalHeight) return;
  const newWidth = naturalWidth * currentZoom;
  const newHeight = naturalHeight * currentZoom;
  certModalImg.style.width = `${Math.round(newWidth)}px`;
  certModalImg.style.height = `${Math.round(newHeight)}px`;
  certModalImg.style.maxWidth = 'none';
  certModalImg.style.maxHeight = 'none';
  const zoomLevelEl = document.getElementById('zoomLevel');
  if (zoomLevelEl) {
    zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
  }
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
  currentZoom = calculateFitZoom();
  if (imgWrapper) {
    imgWrapper.scrollLeft = 0;
    imgWrapper.scrollTop = 0;
  }
  updateZoom();
}

// Pan functionality
let isPanning = false;
let startX, startY, scrollLeft, scrollTop;

if (imgWrapper) {
  // Store natural dimensions when image loads and fit it
  certModalImg.addEventListener('load', () => {
    naturalWidth = certModalImg.naturalWidth;
    naturalHeight = certModalImg.naturalHeight;
    resetZoom();
  });

  function canPan() {
    return imgWrapper.scrollWidth > imgWrapper.clientWidth || imgWrapper.scrollHeight > imgWrapper.clientHeight;
  }

  imgWrapper.addEventListener('mousedown', (e) => {
    if (canPan()) {
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
    imgWrapper.style.cursor = canPan() ? 'grab' : 'default';
  });

  imgWrapper.addEventListener('mouseup', () => {
    isPanning = false;
    imgWrapper.style.cursor = canPan() ? 'grab' : 'default';
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
  // Open on card click or Enter/Space keypress (grouped by cert list)
  const certCards = Array.from(document.querySelectorAll('.cert-card'));
  const certGallery = certCards.map(c => ({
    src: c.dataset.cert,
    title: c.dataset.certTitle || '',
    alt: c.querySelector('img')?.alt || ''
  }));

  certCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openCertModal(card.dataset.cert, card.dataset.certTitle, card.querySelector('img')?.alt, certGallery, idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(card.dataset.cert, card.dataset.certTitle, card.querySelector('img')?.alt, certGallery, idx);
      }
    });
  });

  certModalClose.addEventListener('click', closeCertModal);
  certModalBackdrop.addEventListener('click', closeCertModal);

  // Group screenshot items on page
  const screenshotItems = Array.from(document.querySelectorAll('.lab-test-img, .lab-inline-img, .pt-lab-img, .project-screenshot-img, .homelab-live-screenshot'))
    .filter(item => !item.classList.contains('pt-lab-img--none') && item.querySelector('img'));

  const screenshotGallery = screenshotItems.map(item => {
    const img = item.querySelector('img');
    const title = item.dataset.certTitle
      || item.closest('.project-screenshot-item')?.querySelector('.project-screenshot-caption')?.textContent.trim()
      || item.closest('.homelab-live-screenshot')?.querySelector('.homelab-screenshot-caption')?.textContent.trim()
      || img?.alt
      || '';
    return { src: img ? img.src : '', title, alt: img?.alt || '' };
  });

  screenshotItems.forEach((item, idx) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const data = screenshotGallery[idx];
      if (data && data.src) {
        openCertModal(data.src, data.title, data.alt, screenshotGallery, idx);
      }
    });
  });

  // Next / Previous buttons
  const prevBtn = document.getElementById('certModalPrev');
  const nextBtn = document.getElementById('certModalNext');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateModal(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateModal(1));

  // Double-click to toggle zoom between fit and 100%
  if (imgWrapper) {
    imgWrapper.addEventListener('dblclick', (e) => {
      e.preventDefault();
      const fitZoom = calculateFitZoom();
      if (Math.abs(currentZoom - fitZoom) < 0.05) {
        currentZoom = 1; // zoom to 100%
      } else {
        currentZoom = fitZoom; // reset back to fit
      }
      updateZoom();
    });
  }

  // Keyboard navigation & controls
  document.addEventListener('keydown', (e) => {
    if (certModal.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      closeCertModal();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateModal(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateModal(1);
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      zoomIn();
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      zoomOut();
    } else if (e.key === '0') {
      e.preventDefault();
      resetZoom();
    }
  });

  // Zoom controls
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const zoomResetBtn = document.getElementById('zoomReset');

  if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

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

  // Recalculate fit on window resize if modal is open
  window.addEventListener('resize', () => {
    if (!certModal.hasAttribute('hidden') && naturalWidth && naturalHeight) {
      resetZoom();
    }
  });
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
