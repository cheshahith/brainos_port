import './index.css';

window.jsErrors = [];
window.onerror = function(message, source, lineno, colno, error) {
  const errObj = {message, source, lineno, colno, error: error ? error.stack : null};
  window.jsErrors.push(errObj);
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.bottom = '10px';
  div.style.left = '10px';
  div.style.background = 'red';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.style.zIndex = '999999';
  div.style.fontSize = '12px';
  div.style.maxWidth = '90vw';
  div.style.wordBreak = 'break-all';
  div.textContent = "JS ERROR: " + message + " at " + lineno + ":" + colno;
  document.body.appendChild(div);
};

const init = () => {
  // --- DOM Elements ---
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // --- Scroll Effect for Navbar ---
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run once on load in case page starts scrolled
  handleScroll();

  // --- Mobile Hamburger Menu Toggle ---
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Active Nav Link Tracking on Scroll ---
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewport area
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop active classes
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update mobile active classes
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // --- Framework Animation & Interaction Logic ---
  const frameworkSection = document.getElementById('programs');
  if (frameworkSection) {
    const frameworkObserverOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px', // Trigger when 15% of the section is visible
      threshold: 0.1
    };

    const frameworkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, frameworkObserverOptions);

    frameworkObserver.observe(frameworkSection);

    // --- Interactive Staircase Code ---
    const frameworkSteps = {
      'G': {
        index: '01',
        letter: 'G',
        title: 'Get Aware',
        goal: 'Discover Invisible Income Ceiling',
        desc: 'Uncover the hidden mental and neural blocks that dictate your financial limits. Most leaders operate under an invisible ceiling of success—awareness is the first step to shattering it.',
        outcome: 'Shatter baseline revenue constraints'
      },
      'R': {
        index: '02',
        letter: 'R',
        title: 'Recognise',
        goal: 'Identify Survival Brain Patterns',
        desc: 'Deconstruct the stress-induced survival mechanisms of your brain. Understand how fear of loss, exposure, or failure triggers automatic decision patterns under pressure.',
        outcome: 'De-bias critical strategic choices'
      },
      'O': {
        index: '03',
        letter: 'O',
        title: 'Open Identity',
        goal: 'Step Into Premium Coach Identity',
        desc: 'Recalibrate your self-image to hold a higher frequency of authority and value. Align your identity with the elite clientele you want to attract and lead.',
        outcome: 'Establish high-ticket authority'
      },
      'W': {
        index: '04',
        letter: 'W',
        title: 'Wire New Success Patterns',
        goal: 'Rewire Nervous System for Wealth & Impact',
        desc: 'Build neural capacity to hold wealth and power. Replace old anxiety loops with high-performance pathways, allowing your nervous system to feel safe in expansion.',
        outcome: 'Build high-stress capacity'
      },
      'T': {
        index: '05',
        letter: 'T',
        title: 'Transform Business Systems',
        goal: 'Build Scalable Offer & Audience Growth',
        desc: 'Optimize your operational engines and offer design. Match your upgraded inner capacity with scalable business models that expand your reach without burnout.',
        outcome: 'Operational scale & client acquisition'
      },
      'H': {
        index: '06',
        letter: 'H',
        title: 'Hold Identity',
        goal: 'Operate as NeuroBusiness Leader',
        desc: 'Consistently hold and sustain your new level of success. Secure your seat at the table as a NeuroBusiness leader, managing larger revenues, teams, and market authority.',
        outcome: 'Sustained market leadership'
      }
    };

    const stepRows = frameworkSection.querySelectorAll('.staircase-row');
    const detailsPanelContent = document.querySelector('.staircase-details-panel .details-content-wrapper');
    let activeStepKey = 'G'; // default starting step

    // Initial setup: activate the bottom step (G)
    const initialRow = frameworkSection.querySelector('.row-g');
    if (initialRow) {
      initialRow.classList.add('is-active');
      const card = initialRow.querySelector('.step-card');
      if (card) card.classList.add('is-active');
    }

    const updateDetailsPanel = (stepKey) => {
      if (stepKey === activeStepKey) return;
      const stepData = frameworkSteps[stepKey];
      if (!stepData) return;

      activeStepKey = stepKey;

      if (detailsPanelContent) {
        detailsPanelContent.classList.add('fade-out');

        setTimeout(() => {
          document.getElementById('details-index').textContent = stepData.index;
          document.getElementById('details-letter').textContent = stepData.letter;
          document.getElementById('details-title').textContent = stepData.title;
          document.getElementById('details-goal-text').textContent = stepData.goal;
          document.getElementById('details-desc-text').textContent = stepData.desc;
          document.getElementById('details-outcome-text').textContent = stepData.outcome;

          detailsPanelContent.classList.remove('fade-out');
        }, 300);
      }
    };

    stepRows.forEach(row => {
      const stepKey = row.getAttribute('data-step');
      const card = row.querySelector('.step-card');

      // Desktop Hover Events
      row.addEventListener('mouseenter', () => {
        // Remove active class from all other steps
        stepRows.forEach(r => {
          r.classList.remove('is-active');
          const c = r.querySelector('.step-card');
          if (c) c.classList.remove('is-active');
        });

        // Set this step active
        row.classList.add('is-active');
        if (card) card.classList.add('is-active');

        // Update details panel
        updateDetailsPanel(stepKey);
      });

      // Mobile Click Events (Accordion Drawer)
      if (card) {
        card.addEventListener('click', (e) => {
          // Check if viewport is mobile/tablet where accordion is active
          if (window.innerWidth <= 768) {
            const isOpen = card.classList.contains('is-open');

            // Close all other drawers
            stepRows.forEach(r => {
              const c = r.querySelector('.step-card');
              if (c) c.classList.remove('is-open');
            });

            // Toggle this drawer
            if (!isOpen) {
              card.classList.add('is-open');
            }
          }
        });
      }
    });
  }

  // --- Masterclass Offer Card Entrance Animation ---
  const offerCard = document.querySelector('.offer-card');
  if (offerCard) {
    const offerObserverOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const offerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, offerObserverOptions);

    offerObserver.observe(offerCard);
  }

  // --- Contact Form & Social Links Entrance Animation ---
  const contactForm = document.getElementById('whatsapp-form');
  const socialLinks = document.querySelector('.social-links-wrapper');
  if (contactForm) {
    const contactObserverOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (socialLinks) {
            socialLinks.classList.add('visible');
          }
        }
      });
    }, contactObserverOptions);

    contactObserver.observe(contactForm);
  }

  // --- About Section Counter Animation ---
  const counterElements = document.querySelectorAll('.stat-number');
  const aboutSection = document.getElementById('about');

  if (aboutSection && counterElements.length > 0) {
    // Store original values and parse them
    counterElements.forEach(el => {
      const originalText = el.textContent.trim();
      el.setAttribute('data-original', originalText);

      // Parse target numeric value and suffix (e.g. "1M+" -> 1, "M+", "50,000+" -> 50000, "+")
      const targetMatch = originalText.replace(/,/g, '').match(/\d+/);
      const target = targetMatch ? parseInt(targetMatch[0], 10) : 0;
      const suffix = originalText.replace(/[\d,]+/g, '');
      const formatCommas = originalText.includes(',');

      el.setAttribute('data-target-val', target);
      el.setAttribute('data-suffix', suffix);
      el.setAttribute('data-commas', formatCommas);
      
      // Set initial value to 0 + suffix
      el.textContent = '0' + suffix;
    });

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target-val'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const formatCommas = el.getAttribute('data-commas') === 'true';
      const duration = 2000; // 2 seconds animation
      let startTime = null;

      if (el.aniFrameId) {
        cancelAnimationFrame(el.aniFrameId);
      }

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentValue = Math.floor(easeProgress * target);

        let displayValue = currentValue;
        if (formatCommas) {
          displayValue = currentValue.toLocaleString();
        }

        el.textContent = displayValue + suffix;

        if (progress < 1) {
          el.aniFrameId = requestAnimationFrame(step);
        } else {
          let finalDisplay = target;
          if (formatCommas) {
            finalDisplay = target.toLocaleString();
          }
          el.textContent = finalDisplay + suffix;
        }
      };

      el.aniFrameId = requestAnimationFrame(step);
    };

    const resetCounter = (el) => {
      if (el.aniFrameId) {
        cancelAnimationFrame(el.aniFrameId);
      }
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = '0' + suffix;
    };

    const aboutObserverOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterElements.forEach(animateCounter);
        } else {
          counterElements.forEach(resetCounter);
        }
      });
    }, aboutObserverOptions);

    aboutObserver.observe(aboutSection);
  }

  // --- Shop Modal Logic ---
  const shopTriggers = [document.getElementById('book-trigger'), document.getElementById('book-purchase-btn')];
  const bookModal = document.getElementById('book-modal');
  const bookModalClose = document.getElementById('book-modal-close');

  if (bookModal && bookModalClose) {
    shopTriggers.forEach(trigger => {
      if(trigger) {
        trigger.addEventListener('click', () => {
          bookModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
      }
    });

    const closeModal = () => {
      bookModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    bookModalClose.addEventListener('click', closeModal);
    
    // Close when clicking outside content
    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) {
        closeModal();
      }
    });
  }

  // --- Smooth Scroll Correction for Navbar Height offset ---
  const allNavLinks = [...desktopLinks, ...mobileLinks];
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80; // approximate collapsed header height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- WhatsApp Contact Form Logic ---
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameField = document.getElementById('form-name');
      const phoneField = document.getElementById('form-phone');
      const emailField = document.getElementById('form-email');
      const interestField = document.getElementById('form-interest');
      const messageField = document.getElementById('form-message');
      
      let isValid = true;
      
      if (!nameField.value.trim()) {
        nameField.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameField.parentElement.classList.remove('has-error');
      }
      
      if (!phoneField.value.trim()) {
        phoneField.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        phoneField.parentElement.classList.remove('has-error');
      }
      
      if (!interestField.value) {
        interestField.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        interestField.parentElement.classList.remove('has-error');
      }
      
      if (!isValid) return;
      
      const name = nameField.value.trim();
      const phone = phoneField.value.trim();
      const email = emailField.value.trim() || 'Not provided';
      const interest = interestField.value;
      const userMessage = messageField.value.trim() || 'No additional message';
      
      const message = `🌟 New Enquiry — BRAINOS

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
🎯 Looking For: ${interest}
💬 Message: ${userMessage}`;
      
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/918637619427?text=${encoded}`, '_blank');
      
      whatsappForm.reset();
    });
    
    // Clear error state on input/change
    const inputs = whatsappForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
