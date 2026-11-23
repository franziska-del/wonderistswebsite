import './styles.css';
import './next-gen.css';
import './seychelles.css';
import content from './content/seychelles.json';
import { submitForm } from './form-submit.js';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const paragraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
const pad = (index) => String(index + 1).padStart(2, '0');

document.title = content.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);

document.querySelector('#app').innerHTML = `
  <header class="site-header ng-header" data-header>
    <a class="brand" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Open menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="#experience">${escapeHtml(content.navigation.experiences)}</a>
      <a href="#program">${escapeHtml(content.navigation.program)}</a>
      <a class="ng-nav-cta" href="#register">${escapeHtml(content.navigation.register)}</a>
    </nav>
  </header>

  <main id="main">
    <section class="ng-hero sy-hero" id="top" aria-labelledby="hero-title">
      <div class="ng-hero__copy">
        <p class="sy-eyebrow reveal">${escapeHtml(content.hero.saveTheDate)}</p>
        <h1 id="hero-title" class="reveal">${escapeHtml(content.hero.title)}</h1>
        <div class="ng-hero__rule" aria-hidden="true"></div>
        <p class="sy-hero__details reveal">${escapeHtml(content.hero.details)}</p>
        <p class="ng-hero__lead sy-hero__question reveal">${escapeHtml(content.hero.question)}</p>
        <p class="sy-hero__lead reveal">${escapeHtml(content.hero.lead)}</p>
        <div class="button-row reveal">
          <a class="button button--primary" href="#register">${escapeHtml(content.hero.primaryCta)}</a>
          <a class="button button--outline" href="#experience">${escapeHtml(content.hero.secondaryCta)}</a>
        </div>
        <p class="sy-note reveal">${escapeHtml(content.hero.note)}</p>
      </div>
      <div class="sy-hero__panel" aria-hidden="true">
        <div class="sy-hero__sun"></div>
        <p class="sy-hero__motto">${content.hero.eyebrow.split('. ').map((part) => `<span>${escapeHtml(part.replace(/\.$/, ''))}.</span>`).join('')}</p>
        <p class="sy-hero__place">Praslin<br />Seychelles</p>
        <div class="sy-hero__waves"></div>
      </div>
    </section>

    <section class="ng-intro sy-intro" aria-label="Welcome">
      <div class="ng-section-label reveal">${escapeHtml(content.intro.label)}</div>
      <div class="ng-intro__copy sy-intro__copy reveal">${paragraphs(content.intro.body)}</div>
      <dl class="ng-facts reveal" aria-label="Retreat at a glance">
        ${content.facts.map((fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join('')}
      </dl>
    </section>

    <section class="wi-reasons sy-experiences" id="experience" aria-labelledby="experience-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label">${escapeHtml(content.experiences.label)}</div>
        <h2 id="experience-title">${escapeHtml(content.experiences.title)}</h2>
      </header>
      <div class="wi-reasons__list">
        ${content.experiences.items.map((item, index) => `
          <article class="wi-reason reveal">
            <span>${pad(index)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <div><p>${escapeHtml(item.body)}</p></div>
          </article>`).join('')}
      </div>
    </section>

    <section class="sy-balance" aria-labelledby="balance-title">
      <header class="sy-balance__heading reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.balance.label)}</div>
        <h2 id="balance-title">${escapeHtml(content.balance.title)}</h2>
        <p>${escapeHtml(content.balance.intro)}</p>
      </header>
      <ul class="sy-balance__list">
        ${content.balance.items.map((item) => `<li class="reveal"><strong>${escapeHtml(item.title)}</strong> ${escapeHtml(item.body)}</li>`).join('')}
      </ul>
      <p class="sy-balance__outro reveal">${escapeHtml(content.balance.outro)}</p>
    </section>

    <section class="ng-itinerary sy-program" id="program" aria-labelledby="program-title">
      <header class="ng-itinerary__intro reveal">
        <div class="ng-section-label">${escapeHtml(content.program.label)}</div>
        <h2 id="program-title">${escapeHtml(content.program.title)}</h2>
      </header>
      ${content.program.days.map((day, index) => `
        <article class="ng-day${index === 1 ? ' ng-day--ocean' : ''}" aria-labelledby="day-${index + 1}-title">
          <header class="ng-day__header reveal">
            <div class="ng-day__number">${pad(index)}</div>
            <div><p>${escapeHtml(day.date)}</p><h3 id="day-${index + 1}-title">${escapeHtml(day.title)}</h3></div>
          </header>
          <div class="sy-day__body reveal"><p>${escapeHtml(day.body)}</p></div>
        </article>`).join('')}
    </section>

    <section class="wi-inclusions sy-package" aria-labelledby="package-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.package.label)}</div>
        <h2 id="package-title">${escapeHtml(content.package.title)}</h2>
      </header>
      <div class="sy-package__copy reveal">
        <p>${escapeHtml(content.package.body)}</p>
        <p class="sy-package__note">${escapeHtml(content.package.note)}</p>
        <a class="button button--ember" href="#register">${escapeHtml(content.package.cta)}</a>
      </div>
    </section>

    <section class="sy-closing" aria-labelledby="closing-title">
      <div class="sy-closing__copy reveal">
        <div class="ng-section-label">${escapeHtml(content.closing.label)}</div>
        <h2 id="closing-title">${escapeHtml(content.closing.title)}</h2>
        <p>${escapeHtml(content.closing.body)}</p>
        <p class="sy-closing__statement">${escapeHtml(content.closing.statement)}</p>
      </div>
    </section>

    <section class="ng-register sy-register" id="register" aria-labelledby="register-title">
      <div class="ng-register__copy reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.register.label)}</div>
        <h2 id="register-title">${escapeHtml(content.register.title)}</h2>
        <p><strong>${escapeHtml(content.register.details)}</strong></p>
        <p>${escapeHtml(content.register.body)}</p>
        <p class="sy-register__tagline">${escapeHtml(content.register.tagline)}</p>
      </div>
      <form class="ng-register__form reveal" id="seychelles-form">
        <label class="form-honeypot" aria-hidden="true">Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off" /></label>
        <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
        <label>Email address<input type="email" name="email" autocomplete="email" required /></label>
        <label>Phone <span>(optional)</span><input type="tel" name="phone" autocomplete="tel" /></label>
        <label>Your children’s ages<input type="text" name="childrenAges" placeholder="e.g. 11 and 14" required /></label>
        <label>Anything you’d like us to know? <span>(optional)</span><textarea name="message" rows="3"></textarea></label>
        <button class="button button--sand" type="submit">${escapeHtml(content.register.formCta)}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand brand--footer" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <a class="ng-footer-link" href="/">Explore all adventures</a>
    <p>© <span data-year></span> The Wonderists</p>
  </footer>
`;

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const form = document.querySelector('#seychelles-form');

const menuLabel = menuButton.querySelector('.sr-only');
const menuItems = [...nav.querySelectorAll('a, button')];

const setMenuState = (isOpen, { returnFocus = false } = {}) => {
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuLabel.textContent = isOpen ? 'Close menu' : 'Open menu';
  nav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);

  if (isOpen) {
    menuItems[0]?.focus({ preventScroll: true });
  } else if (returnFocus) {
    menuButton.focus({ preventScroll: true });
  }
};

const closeMenu = () => setMenuState(false);

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuState(false, { returnFocus: true });
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm({
    form,
    subject: 'Island of Possibility (Seychelles) interest',
    endpoint: 'https://formsubmit.co/ajax/franziska@basicbananas.com',
    successMessage: content.register.success,
    errorMessage: 'We couldn’t send your details. Please try again.',
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
document.querySelector('[data-year]').textContent = new Date().getFullYear();
