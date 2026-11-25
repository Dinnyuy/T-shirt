(() => {
  const config = window.BRAND_CONFIG;
  let language = 'en';
  let currentStep = 0;
  let left99Variant = 'sweatshirt';

  const form = document.querySelector('#interest-form');
  const steps = [...document.querySelectorAll('.form-step')];
  const error = document.querySelector('#form-error');
  const tr = (en, fr) => (language === 'fr' ? fr : en);

  const DESIGN_PRESETS = {
    yeshua: { collection: 'Faith Essentials', design: 'Yeshua', garment: 'T-shirt', colour: 'Cream' },
    pray: { collection: 'Faith & Her', design: 'Girl... Pray', garment: 'T-shirt', colour: 'Pink' },
    'not-forsaken': { collection: 'Faith Essentials', design: 'Not Forsaken', garment: 'T-shirt', colour: 'Black' },
    'child-of-god': { collection: 'Faith & Her', design: 'Child of God', garment: 'T-shirt', colour: 'Black' },
    'good-shepherd': { collection: 'Faith & Her', design: 'Good Shepherd', garment: 'T-shirt', colour: 'White' },
    'know-jesus': { collection: 'Faith Essentials', design: 'Know Jesus Know Peace', garment: 'T-shirt', colour: 'Black' },
    'walk-by-faith': { collection: 'Faith Essentials', design: 'Walk By Faith', garment: 'T-shirt', colour: 'Burgundy' },
    'psalm-91': { collection: 'Faith Essentials', design: 'Psalm 91', garment: 'T-shirt', colour: 'Black' },
    'left-the-99': { collection: 'Faith Essentials', design: 'He Left the 99', garment: 'Sweatshirt', colour: 'Cream' },
    'be-the-light': { collection: 'Hoodie Collection', design: 'Be the Light', garment: 'Sweatshirt', colour: 'White' },
    'greater-is-he': { collection: 'Hoodie Collection', design: 'Greater Is He', garment: 'Sweatshirt', colour: 'Navy' },
    yahweh: { collection: 'Hoodie Collection', design: 'Yahweh', garment: 'Hoodie', colour: 'White' },
    'pray-thess': { collection: 'Hoodie Collection', design: 'Pray 1 Thess 5:17', garment: 'Hoodie', colour: 'White' },
    'faith-hoodie': { collection: 'Hoodie Collection', design: 'Faith Hebrews 11:1', garment: 'Hoodie', colour: 'Burnt Orange' },
  };

  function applyBrand() {
    document.querySelectorAll('[data-brand]').forEach(el => {
      el.textContent = config.name;
    });
    document.querySelectorAll('[data-tagline]').forEach(el => {
      el.textContent = config.tagline[language];
    });
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
    document.title = `${config.name} — ${tr('Wear Your Faith.', 'Portez votre foi.')}`;
    document.querySelector('meta[name="description"]').content = config.siteDescription[language];
    document.querySelector('meta[property="og:site_name"]').content = config.name;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = config.siteDescription[language];

    document.querySelectorAll('[data-contact]').forEach(el => {
      const key = el.dataset.contact;
      const label = key === 'whatsapp' ? 'WhatsApp' : key[0].toUpperCase() + key.slice(1);
      const value = key === 'whatsapp' ? config.contact.whatsapp : config.socials[key];
      el.replaceChildren();
      if (value) {
        const a = document.createElement('a');
        a.textContent = `${label} ↗`;
        const url = key === 'whatsapp' ? `https://wa.me/${value.replace(/\D/g, '')}` : value;
        if (/^https:\/\//.test(url)) {
          a.href = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          el.append(a);
        } else {
          el.textContent = label;
        }
      } else {
        el.textContent = `${label} · ${key === 'whatsapp' ? tr('[number to be added]', '[numéro à ajouter]') : tr('[link to be added]', '[lien à ajouter]')}`;
      }
    });
  }

  function setLanguage(lang) {
    language = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-fr]').forEach(el => {
      el.innerHTML = el.dataset[lang];
    });
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.setAttribute('aria-pressed', String(el.dataset.lang === lang));
    });
    const nav = document.querySelector('#navigation');
    if (nav) nav.setAttribute('aria-label', tr('Main navigation', 'Navigation principale'));
    const menu = document.querySelector('.menu-toggle');
    if (menu) menu.setAttribute('aria-label', tr('Toggle navigation', 'Afficher ou masquer la navigation'));
    if (form) {
      form.elements.language.value = lang;
      error.textContent = '';
      updateSummary();
    }
    applyBrand();
  }

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  const menu = document.querySelector('.menu-toggle');
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(expanded));
    document.querySelector('#navigation').classList.toggle('open', expanded);
  });

  document.querySelectorAll('#navigation a').forEach(a => {
    a.addEventListener('click', () => {
      menu?.setAttribute('aria-expanded', 'false');
      document.querySelector('#navigation')?.classList.remove('open');
    });
  });

  // Hero lookbook switcher
  const heroSlides = [...document.querySelectorAll('.hero-slide')];
  const heroCounter = document.querySelector('#hero-counter');
  if (heroSlides.length > 1 && heroCounter) {
    let heroIndex = 0;
    const setHeroSlide = next => {
      heroIndex = (next + heroSlides.length) % heroSlides.length;
      heroSlides.forEach((slide, idx) => {
        const active = idx === heroIndex;
        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
      });
      heroCounter.textContent = `0${heroIndex + 1} / 0${heroSlides.length}`;
    };
    document.querySelectorAll('[data-hero-dir]').forEach(btn => {
      btn.addEventListener('click', () => setHeroSlide(heroIndex + Number(btn.dataset.heroDir)));
    });
  }

  // Catalog filter bar
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const productCards = [...document.querySelectorAll('.products .product')];
  function filterCatalog(tag) {
    filterButtons.forEach(btn => {
      const active = btn.dataset.filter === tag;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    productCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      card.hidden = tag !== 'all' && !tags.includes(tag);
    });
  }
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => filterCatalog(btn.dataset.filter));
  });

  // Dual garment preview switch on "He Left the 99"
  const left99Card = document.querySelector('#card-left-the-99');
  const left99Img = document.querySelector('#left-99-img');
  if (left99Card && left99Img) {
    left99Card.querySelectorAll('.garment-switch button').forEach(btn => {
      btn.addEventListener('click', () => {
        left99Variant = btn.dataset.variant;
        left99Img.src = left99Img.dataset[left99Variant];
        left99Card.querySelectorAll('.garment-switch button').forEach(b => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
      });
    });
  }

  if (!form) {
    setLanguage(new URLSearchParams(location.search).get('lang') === 'fr' ? 'fr' : 'en');
    return;
  }

  const control = name => form.elements.namedItem(name);

  // Inactive conditional fields are disabled, so stale values never become part of a request.
  function conditional(id, show) {
    const region = document.getElementById(id);
    region.hidden = !show;
    region.querySelectorAll('input,select,textarea').forEach(el => {
      el.disabled = !show;
      if (el.dataset.required === 'true') el.required = show;
    });
  }

  function updateConditional() {
    const custom =
      control('collection').value === 'Custom Creations' ||
      control('design').value === 'Another design' ||
      control('customize-sample').checked;
    conditional('custom-fields', custom);
    conditional('group-fields', control('collection').value === 'Group / Church Orders');
    conditional('other-colour', control('colour').value === 'Other');
    conditional('other-city', control('city').value === 'Other');
    updateSummary();
  }

  function updateSummary() {
    if (!form) return;
    const summary = document.querySelector('#request-summary');
    const garment = form.querySelector('[name="garment"]:checked')?.closest('label').textContent.trim() || '';
    const design = form.querySelector('[name="design"]:checked')?.closest('label').textContent.trim() || '';
    const collection = control('collection').value ? control('collection').selectedOptions[0]?.textContent || '' : '';
    const size = control('size').selectedOptions[0]?.textContent || '';
    const colour = control('colour').selectedOptions[0]?.textContent || '';
    const parts = [garment, collection, design, size, colour, `${tr('Quantity', 'Quantité')}: ${control('quantity').value}`].filter(Boolean);
    summary.textContent = parts.join(' · ');
  }

  function showStep(index, focus = true) {
    currentStep = index;
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    document.querySelectorAll('.form-progress > span').forEach((el, i) => {
      el.classList.toggle('active', i === index);
      if (i === index) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    document.querySelector('#previous').hidden = index === 0;
    document.querySelector('#next').hidden = index === steps.length - 1;
    document.querySelector('#submit').hidden = index !== steps.length - 1;
    error.textContent = '';
    if (focus) {
      const heading = steps[index].querySelector('h3');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function validateStep(index) {
    for (const el of steps[index].querySelectorAll('input,select,textarea')) {
      if (el.matches('input[type=text], textarea') && el.required) {
        el.setCustomValidity(el.value.trim() ? '' : tr('Please enter your answer.', 'Veuillez saisir votre réponse.'));
      }
      if (!el.disabled && !el.checkValidity()) {
        showStep(index, false);
        error.textContent = tr(
          'Please complete the required fields and check your entries.',
          'Veuillez remplir les champs obligatoires et vérifier vos réponses.'
        );
        el.reportValidity();
        el.focus();
        return false;
      }
    }
    return true;
  }

  form.noValidate = true;
  document.querySelector('#next').addEventListener('click', () => {
    if (validateStep(currentStep)) showStep(currentStep + 1);
  });
  document.querySelector('#previous').addEventListener('click', () => showStep(currentStep - 1));
  form.addEventListener('change', updateConditional);
  form.addEventListener('input', event => {
    if (event.target.matches('input[type=text], textarea')) event.target.setCustomValidity('');
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (currentStep < 2) {
      if (validateStep(currentStep)) showStep(currentStep + 1);
      return;
    }
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) return;
    }
    const submit = document.querySelector('#submit');
    submit.disabled = true;
    submit.textContent = tr('Submitting…', 'Envoi en cours…');
    error.textContent = '';
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error('Submission failed');
      window.location.assign('/thank-you?lang=' + language);
    } catch {
      error.textContent = tr(
        'Your request could not be sent. Please check your connection and try again. Your entries are still here.',
        'Votre demande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez. Vos réponses sont conservées.'
      );
      submit.disabled = false;
      submit.innerHTML = tr('SUBMIT MY INTEREST ↗', 'ENVOYER MA DEMANDE ↗');
    }
  });

  document.querySelectorAll('[data-pick]').forEach(link => {
    link.addEventListener('click', () => {
      const pick = link.dataset.pick;
      control('customize-sample').checked = link.dataset.custom === 'true';
      if (pick === 'custom') {
        control('collection').value = 'Custom Creations';
        control('design').value = 'Another design';
      } else if (pick === 'group') {
        control('collection').value = 'Group / Church Orders';
        control('design').value = 'Another design';
      } else if (DESIGN_PRESETS[pick]) {
        const preset = DESIGN_PRESETS[pick];
        control('collection').value = preset.collection;
        control('design').value = preset.design;
        control('garment').value =
          pick === 'left-the-99' ? (left99Variant === 'tee' ? 'T-shirt' : 'Sweatshirt') : preset.garment;
        control('colour').value = preset.colour;
      }
      const checkedDesign = form.querySelector('[name="design"]:checked');
      checkedDesign?.closest('label')?.scrollIntoView({ block: 'nearest' });
      updateConditional();
      showStep(0, false);
    });
  });

  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', () => {
      const category = link.dataset.category;
      filterCatalog(category);
      control('collection').value = {
        essentials: 'Faith Essentials',
        her: 'Faith & Her',
        hoodie: 'Hoodie Collection',
      }[category];
      if (category === 'hoodie') control('garment').value = 'Hoodie';
      updateConditional();
      showStep(0, false);
    });
  });

  document.querySelectorAll('[data-required="true"]').forEach(el => {
    el.required = true;
  });
  updateConditional();
  showStep(0, false);
  setLanguage('en');
})();
