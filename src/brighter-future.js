import './styles.css';
import './next-gen.css';
import './seychelles.css';
import './brighter-future.css';
import content from './content/brighter-future.json';
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
      <a href="#program">${escapeHtml(content.navigation.program)}</a>
      <a href="#weeks">${escapeHtml(content.navigation.weeks)}</a>
      <a href="#mentors">${escapeHtml(content.navigation.mentors)}</a>
      <a class="ng-nav-cta" href="#apply">${escapeHtml(content.navigation.apply)}</a>
    </nav>
  </header>

  <main id="main">
    <section class="ng-hero sy-hero bf-hero" id="top" aria-labelledby="hero-title">
      <div class="ng-hero__copy">
        <p class="sy-eyebrow reveal">${escapeHtml(content.hero.eyebrow)}</p>
        <h1 id="hero-title" class="reveal">${escapeHtml(content.hero.title)}</h1>
        <div class="ng-hero__rule" aria-hidden="true"></div>
        <p class="ng-hero__lead sy-hero__question reveal">${escapeHtml(content.hero.question)}</p>
        <p class="sy-hero__lead reveal">${escapeHtml(content.hero.lead)}</p>
        <p class="bf-hero__motto reveal">${content.hero.motto.map((line) => `<span>${escapeHtml(line)}</span>`).join(' ')} ${escapeHtml(content.hero.giveback)}</p>
        <div class="button-row reveal">
          <a class="button button--primary" href="#apply">${escapeHtml(content.hero.primaryCta)}</a>
          <a class="button button--outline" href="#weeks">${escapeHtml(content.hero.secondaryCta)}</a>
        </div>
        <p class="sy-note reveal">${escapeHtml(content.hero.note)}</p>
      </div>
      <figure class="ng-hero__media bf-hero__media">
        <img src="${escapeHtml(content.hero.image)}" alt="${escapeHtml(content.hero.imageAlt)}" />
      </figure>
    </section>

    <section class="ng-intro bf-intro" id="program" aria-labelledby="intro-title">
      <div class="ng-section-label reveal">${escapeHtml(content.intro.label)}</div>
      <div class="ng-intro__heading reveal"><h2 id="intro-title">${escapeHtml(content.intro.title)}</h2></div>
      <div class="ng-intro__copy reveal">${paragraphs(content.intro.body)}</div>
      <dl class="ng-facts reveal" aria-label="Program at a glance">
        ${content.facts.map((fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join('')}
      </dl>
    </section>

    <section class="sy-balance bf-learn" aria-labelledby="learn-title">
      <header class="sy-balance__heading reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.learn.label)}</div>
        <h2 id="learn-title">${escapeHtml(content.learn.title)}</h2>
        <p>${escapeHtml(content.learn.intro)}</p>
      </header>
      <ul class="sy-balance__list">
        ${content.learn.items.map((item, index) => `<li class="reveal"><strong>${pad(index)}</strong> ${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>

    <section class="sy-closing bf-giveback" aria-labelledby="giveback-title">
      <div class="sy-closing__copy reveal">
        <div class="ng-section-label">${escapeHtml(content.giveback.label)}</div>
        <h2 id="giveback-title">${escapeHtml(content.giveback.title)}</h2>
        ${paragraphs(content.giveback.body)}
        <p class="sy-closing__statement">${escapeHtml(content.giveback.statement)}</p>
      </div>
    </section>

    <section class="wi-reasons bf-how" aria-labelledby="how-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label">${escapeHtml(content.how.label)}</div>
        <h2 id="how-title">${escapeHtml(content.how.title)}</h2>
      </header>
      <div class="wi-reasons__list">
        ${content.how.items.map((item, index) => `
          <article class="wi-reason reveal">
            <span>${pad(index)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <div><p>${escapeHtml(item.body)}</p></div>
          </article>`).join('')}
      </div>
    </section>

    <section class="ng-questions wi-audience bf-audience" aria-labelledby="audience-title">
      <div class="ng-questions__heading reveal">
        <div class="ng-section-label">${escapeHtml(content.audience.label)}</div>
        <h2 id="audience-title">${escapeHtml(content.audience.title)}</h2>
        <p>${escapeHtml(content.audience.outro)}</p>
      </div>
      <div class="reveal">
        <p class="wi-audience__intro">${escapeHtml(content.audience.intro)}</p>
        <ul class="wi-checklist wi-checklist--dark">${content.audience.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <a class="button button--primary bf-audience__cta" href="#apply">${escapeHtml(content.hero.primaryCta)}</a>
      </div>
    </section>

    <section class="ng-itinerary bf-weeks" id="weeks" aria-labelledby="weeks-title">
      <header class="ng-itinerary__intro reveal">
        <div class="ng-section-label">${escapeHtml(content.weeks.label)}</div>
        <h2 id="weeks-title">${escapeHtml(content.weeks.title)}</h2>
      </header>
      <ol class="ng-moments bf-weeks__list">
        ${content.weeks.items.map((week, index) => `
          <li class="reveal">
            <span>Week ${index + 1}</span>
            <div><h4>${escapeHtml(week.title)}</h4><p>${escapeHtml(week.body)}</p></div>
          </li>`).join('')}
      </ol>
    </section>

    <section class="wi-hosts bf-mentors" id="mentors" aria-labelledby="mentors-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label">${escapeHtml(content.mentors.label)}</div>
        <h2 id="mentors-title">${escapeHtml(content.mentors.title)}</h2>
        <p>${escapeHtml(content.mentors.intro)}</p>
      </header>
      <div class="wi-hosts__list">
        ${content.mentors.items.map((mentor) => `
          <article class="wi-host bf-mentor reveal">
            <img class="bf-mentor__photo" src="${escapeHtml(mentor.image)}" alt="${escapeHtml(mentor.name)}" loading="lazy" />
            <h3>${escapeHtml(mentor.name)}</h3>
            <div>${paragraphs(mentor.body)}</div>
          </article>`).join('')}
      </div>
    </section>

    <section class="sy-balance bf-about" aria-labelledby="about-title">
      <header class="sy-balance__heading reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.about.label)}</div>
        <h2 id="about-title">${escapeHtml(content.about.title)}</h2>
      </header>
      <div class="bf-about__copy reveal">${paragraphs(content.about.body)}</div>
    </section>

    <section class="ng-questions bf-faq" aria-labelledby="faq-title">
      <div class="ng-questions__heading reveal">
        <div class="ng-section-label">${escapeHtml(content.faq.label)}</div>
        <h2 id="faq-title">${escapeHtml(content.faq.title)}</h2>
      </div>
      <div class="ng-questions__list reveal">
        ${content.faq.items.map((item) => `
          <details>
            <summary>${escapeHtml(item.q)}</summary>
            ${paragraphs(item.a)}
          </details>`).join('')}
      </div>
    </section>

    <section class="ng-register sy-register bf-apply" id="apply" aria-labelledby="apply-title">
      <div class="ng-register__copy reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.apply.label)}</div>
        <h2 id="apply-title">${escapeHtml(content.apply.title)}</h2>
        <p>${escapeHtml(content.apply.body)}</p>
        <ul class="bf-apply__details">${content.apply.details.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <form class="ng-register__form reveal" id="brighter-future-form">
        <label class="form-honeypot" aria-hidden="true">Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off" /></label>
        <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
        <label>Email address<input type="email" name="email" autocomplete="email" required /></label>
        <label>Phone <span>(optional)</span><input type="tel" name="phone" autocomplete="tel" /></label>
        <label>Your child’s name<input type="text" name="childName" required /></label>
        <label>Your child’s age<input type="number" name="childAge" min="8" max="17" required /></label>
        <label>What is your child curious about? <span>(optional)</span><textarea name="curiousAbout" rows="3"></textarea></label>
        <button class="button button--sand" type="submit">${escapeHtml(content.apply.formCta)}</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand brand--footer" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <a class="ng-footer-link" href="/">Explore The Wonderists</a>
    <p>© <span data-year></span> The Wonderists</p>
  </footer>
`;

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const form = document.querySelector('#brighter-future-form');

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
    subject: 'Brighter Future Bunch application',
    endpoint: 'https://formsubmit.co/ajax/franziska@basicbananas.com',
    successMessage: content.apply.success,
    errorMessage: 'We couldn’t send your application. Please try again.',
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
