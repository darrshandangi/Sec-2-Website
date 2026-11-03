/**
 * FoldBeat — Consumer Lifestyle Website Interactions
 */

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* -------------------------------------------------------------
     1. COLOR SWATCHES & THUMBNAIL SELECTOR
  ------------------------------------------------------------- */
  const heroMainPhoto = $('#hero-active-img');
  const badgeText = $('#current-badge-text');
  const selectedFinishName = $('#selected-finish-name');
  const modalSelectedFinish = $('#modal-selected-finish');
  const stickyThumbImg = $('#sticky-thumb-img');

  const swatches = $$('.color-circle');
  const colorThumbs = $$('.color-thumb-card');

  const finishDetails = {
    'navy-gold': {
      name: 'Executive Classic (Navy / Gold)',
      badge: 'NAVY & GOLD EDITION',
      img: 'images/foldbeat-speaker-hero.jpg',
      thumb: 'images/speaker-navy-gold.jpg'
    },
    'matte-black': {
      name: 'Stealth Edition (Matte Black)',
      badge: 'MATTE BLACK EDITION',
      img: 'images/speaker-matte-black.jpg',
      thumb: 'images/speaker-matte-black.jpg'
    },
    'forest-green': {
      name: 'Earth Luxury (Forest Green)',
      badge: 'FOREST GREEN & GOLD EDITION',
      img: 'images/speaker-forest-green.jpg',
      thumb: 'images/speaker-forest-green.jpg'
    },
    'champagne-silver': {
      name: 'Modern Minimalist (Champagne)',
      badge: 'CHAMPAGNE PEARL EDITION',
      img: 'images/speaker-champagne-silver.jpg',
      thumb: 'images/speaker-champagne-silver.jpg'
    },
    'plum-silver': {
      name: 'Bold Avant-Garde (Plum)',
      badge: 'PLUM VELVET EDITION',
      img: 'images/speaker-plum-silver.jpg',
      thumb: 'images/speaker-plum-silver.jpg'
    }
  };

  let currentFinish = 'navy-gold';

  function applyFinish(finishKey) {
    const data = finishDetails[finishKey];
    if (!data) return;

    currentFinish = finishKey;

    // Update active circle
    swatches.forEach((s) => s.classList.toggle('active', s.dataset.finish === finishKey));
    // Update active thumbnail
    colorThumbs.forEach((t) => t.classList.toggle('active', t.dataset.finish === finishKey));

    // Update text
    if (selectedFinishName) selectedFinishName.textContent = data.name;
    if (modalSelectedFinish) modalSelectedFinish.textContent = data.name;
    if (badgeText) badgeText.textContent = data.badge;

    // Smooth image transition
    if (heroMainPhoto) {
      heroMainPhoto.style.opacity = '0.3';
      setTimeout(() => {
        heroMainPhoto.src = data.img;
        heroMainPhoto.style.opacity = '1';
      }, 150);
    }

    if (stickyThumbImg) {
      stickyThumbImg.src = data.thumb;
    }
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      applyFinish(swatch.dataset.finish);
    });
  });

  colorThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      applyFinish(thumb.dataset.finish);
    });
  });

  /* -------------------------------------------------------------
     2. "HOW IT FOLDS" PRESET SWITCHER
  ------------------------------------------------------------- */
  const foldStageImg = $('#fold-stage-img');
  const foldModeCaption = $('#fold-mode-caption');
  const foldButtons = $$('.fold-pill-btn');

  const foldModes = {
    '1. Standing Mode (Desk & Quad)': {
      img: 'images/foldbeat-speaker-hero.jpg',
      caption: 'Standing Tent Mode: Perfect for your desk, study table, or coffee table.'
    },
    '2. Wide Stereo (180° Flat)': {
      img: 'images/speaker-navy-gold.jpg',
      caption: 'Wide Stereo Mode: Unfolds 180° flat for room-filling stereo sound separation.'
    },
    '3. Pocket Closed (0° Travel)': {
      img: 'images/speaker-panel-left.svg',
      caption: 'Pocket Mode: Folds completely flat to slip right inside your coat or jeans pocket.'
    }
  };

  foldButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      foldButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const modeKey = btn.textContent.trim();
      const modeData = foldModes[modeKey];
      if (modeData && foldStageImg) {
        foldStageImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          foldStageImg.src = modeData.img;
          if (foldModeCaption) foldModeCaption.textContent = modeData.caption;
          foldStageImg.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  /* -------------------------------------------------------------
     3. STICKY NAVBAR & STICKY BOTTOM BUY BAR
  ------------------------------------------------------------- */
  const siteNav = $('#site-nav');
  const stickyBuyBar = $('#sticky-buy-bar');

  function onScroll() {
    const y = window.scrollY;
    if (siteNav) {
      siteNav.classList.toggle('scrolled', y > 40);
    }
    if (stickyBuyBar) {
      stickyBuyBar.classList.toggle('visible', y > 520);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------------
     4. FAQ ACCORDION
  ------------------------------------------------------------- */
  const faqItems = $$('.faq-item');
  faqItems.forEach((item) => {
    const trigger = $('.faq-question', item);
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((i) => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* -------------------------------------------------------------
     5. BUY NOW CHECKOUT MODAL
  ------------------------------------------------------------- */
  const modal = $('#checkout-modal');
  const modalClose = $('#modal-close-btn');
  const buyTriggers = $$('.buy-now-trigger');
  const confirmOrderBtn = $('#confirm-order-btn');

  function openCheckout() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckout() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  buyTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCheckout();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeCheckout);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckout();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeCheckout();
    }
  });

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      const finishName = finishDetails[currentFinish]?.name || 'Executive Classic';
      alert(`🎉 Thank you for your order!\n\nProduct: FoldBeat (${finishName})\nAmount: ₹1,299\nDelivery: Free Express Shipping (2-3 Days)\n\nConfirmation has been sent to your email!`);
      closeCheckout();
    });
  }

  /* -------------------------------------------------------------
     6. LIFESTYLE IMAGE CAROUSEL (Auto-Moving + Scroll Driven)
  ------------------------------------------------------------- */
  const carouselTrack = $('#carousel-track');
  const prevBtn = $('#carousel-prev-btn');
  const nextBtn = $('#carousel-next-btn');
  const dots = $$('.carousel-dot');

  if (carouselTrack) {
    const slides = $$('.carousel-slide', carouselTrack);
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoSlideTimer = null;
    let isUserScrolling = false;
    let scrollTimeout = null;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    /* Scroll Driven Advance: As user scrolls through the gallery section, slides progress naturally */
    const gallerySection = $('#lifestyle-gallery');
    let lastScrollProgress = -1;

    function handleScrollAdvance() {
      if (!gallerySection) return;
      const rect = gallerySection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if gallery is inside the viewport
      if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
        // Calculate progress from 0 (entered) to 1 (leaving)
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        
        // Map progress to slide index (0 to totalSlides - 1)
        const targetSlide = Math.min(totalSlides - 1, Math.floor(progress * totalSlides));
        
        if (targetSlide !== currentSlide && targetSlide !== lastScrollProgress) {
          lastScrollProgress = targetSlide;
          goToSlide(targetSlide);
        }

        // Briefly pause interval during active user scroll, then resume auto-slide
        stopAutoSlide();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          startAutoSlide();
        }, 1200);
      }
    }

    window.addEventListener('scroll', handleScrollAdvance, { passive: true });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.dataset.slide, 10);
        goToSlide(slideIdx);
        startAutoSlide();
      });
    });

    // Touch & swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoSlide();
    }, { passive: true });

    // Pause auto slide on mouse hover
    const container = $('.carousel-container');
    if (container) {
      container.addEventListener('mouseenter', stopAutoSlide);
      container.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }

})();
