import './styles.css';
import './next-gen.css';
import content from './content/wild-ideas.json';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const paragraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
const numberedRows = (items) => items.map((item, index) => `
  <li class="reveal"><span>${String(index + 1).padStart(2, '0')}</span><div><p>${escapeHtml(item)}</p></div></li>`).join('');

document.title = content.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);

document.querySelector('#app').innerHTML = `
  <header class="site-header ng-header" data-header>
    <a class="brand" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Open menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="#experience">${escapeHtml(content.navigation.experience)}</a>
      <a href="#why-it-works">${escapeHtml(content.navigation.whyItWorks)}</a>
      <a href="#hosts">${escapeHtml(content.navigation.hosts)}</a>
      <a class="ng-nav-cta" href="#book">${escapeHtml(content.navigation.book)}</a>
    </nav>
  </header>

  <main id="main">
    <section class="ng-hero wi-hero" id="top" aria-labelledby="hero-title">
      <div class="ng-hero__copy">
        <h1 id="hero-title" class="reveal">${escapeHtml(content.hero.title)}</h1>
        <div class="ng-hero__rule" aria-hidden="true"></div>
        <p class="ng-hero__lead reveal">${escapeHtml(content.hero.subtitle)}</p>
        <div class="wi-hero__details reveal">
          <p>${escapeHtml(content.hero.dates)}</p>
          <p>${escapeHtml(content.hero.location)}</p>
          <p>${escapeHtml(content.hero.attribution)}</p>
        </div>
        <div class="button-row reveal">
          <a class="button button--primary" href="#book">${escapeHtml(content.hero.primaryCta)}</a>
          <a class="button button--outline" href="#experience">${escapeHtml(content.hero.secondaryCta)}</a>
        </div>
      </div>
      <figure class="ng-hero__media">
        <img src="${escapeHtml(content.hero.image)}" alt="${escapeHtml(content.hero.imageAlt)}" />
        <figcaption>${escapeHtml(content.hero.caption)}</figcaption>
      </figure>
    </section>

    <section class="ng-intro wi-intro" id="experience" aria-labelledby="experience-title">
      <div class="ng-section-label reveal">${escapeHtml(content.intro.label)}</div>
      <div class="ng-intro__heading reveal"><h2 id="experience-title">${escapeHtml(content.intro.title)}</h2></div>
      <div class="ng-intro__copy reveal">
        ${paragraphs(content.intro.body)}
        <p class="wi-statement">${escapeHtml(content.intro.statement)}</p>
      </div>
      <dl class="ng-facts reveal" aria-label="Experience at a glance">
        ${content.facts.map((fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join('')}
      </dl>
    </section>

    <section class="ng-together" aria-labelledby="future-skills-title">
      <div class="ng-together__copy reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.futureSkills.label)}</div>
        <h2 id="future-skills-title">${escapeHtml(content.futureSkills.title)}</h2>
        ${paragraphs(content.futureSkills.body)}
      </div>
      <figure class="ng-together__media reveal">
        <img src="${escapeHtml(content.futureSkills.image)}" loading="lazy" alt="${escapeHtml(content.futureSkills.imageAlt)}" />
        <figcaption>${escapeHtml(content.futureSkills.caption)}</figcaption>
      </figure>
    </section>

    <section class="ng-itinerary wi-journey" aria-labelledby="journey-title">
      <header class="ng-itinerary__intro reveal">
        <div class="ng-section-label">${escapeHtml(content.experience.label)}</div>
        <h2 id="journey-title">${escapeHtml(content.experience.title)}</h2>
        <p>${escapeHtml(content.experience.intro)}</p>
      </header>

      <article class="ng-day" aria-labelledby="adventure-list-title">
        <header class="ng-day__header reveal">
          <div class="ng-day__number">01</div>
          <div><p>The adventure</p><h3 id="adventure-list-title">Do hard things together.</h3></div>
        </header>
        <div>
          <ol class="ng-moments">${numberedRows(content.experience.items)}</ol>
          <p class="wi-section-outro reveal">${escapeHtml(content.experience.outro)}</p>
        </div>
      </article>

      <article class="ng-day ng-day--ocean" aria-labelledby="venture-title">
        <header class="ng-day__header reveal">
          <div class="ng-day__number">02</div>
          <div><p>${escapeHtml(content.venture.label)}</p><h3 id="venture-title">${escapeHtml(content.venture.title)}</h3></div>
        </header>
        <div>
          <div class="wi-rich-copy reveal">${paragraphs(content.venture.body)}</div>
          <ol class="ng-moments">${numberedRows(content.venture.items)}</ol>
          <p class="wi-section-outro reveal">${escapeHtml(content.venture.outro)}</p>
        </div>
      </article>
    </section>

    <section class="wi-reasons" id="why-it-works" aria-labelledby="reasons-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label">${escapeHtml(content.reasons.label)}</div>
        <h2 id="reasons-title">${escapeHtml(content.reasons.title)}</h2>
      </header>
      <div class="wi-reasons__list">
        ${content.reasons.items.map((reason, index) => `
          <article class="wi-reason reveal">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(reason.title)}</h3>
            <div>${paragraphs(reason.body)}</div>
          </article>`).join('')}
      </div>
    </section>

    <section class="wi-inclusions" aria-labelledby="inclusions-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.inclusions.label)}</div>
        <h2 id="inclusions-title">${escapeHtml(content.inclusions.title)}</h2>
        <p>${escapeHtml(content.inclusions.suitability)}</p>
      </header>
      <ul class="wi-checklist reveal">
        ${content.inclusions.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>

    <section class="wi-hosts" id="hosts" aria-labelledby="hosts-title">
      <header class="wi-section-heading reveal">
        <div class="ng-section-label">${escapeHtml(content.hosts.label)}</div>
        <h2 id="hosts-title">${escapeHtml(content.hosts.title)}</h2>
      </header>
      <div class="wi-hosts__list">
        ${content.hosts.items.map((host, index) => `
          <article class="wi-host reveal">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <h3>${escapeHtml(host.name)}</h3>
            <div>${paragraphs(host.body)}</div>
          </article>`).join('')}
      </div>
    </section>

    <section class="ng-questions wi-audience" aria-labelledby="audience-title">
      <div class="ng-questions__heading reveal">
        <div class="ng-section-label">${escapeHtml(content.audience.label)}</div>
        <h2 id="audience-title">${escapeHtml(content.audience.title)}</h2>
        <p>${escapeHtml(content.audience.outro)}</p>
      </div>
      <div class="reveal">
        <p class="wi-audience__intro">${escapeHtml(content.audience.intro)}</p>
        <ul class="wi-checklist wi-checklist--dark">${content.audience.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="ng-take-home" aria-labelledby="closing-title">
      <div class="ng-take-home__shade" aria-hidden="true"></div>
      <div class="ng-take-home__copy reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.closing.label)}</div>
        <h2 id="closing-title">${escapeHtml(content.closing.title)}</h2>
        ${paragraphs(content.closing.body)}
        <a class="button button--ember" href="#book">${escapeHtml(content.closing.cta)}</a>
      </div>
    </section>

    <section class="ng-register" id="book" aria-labelledby="book-title">
      <div class="ng-register__copy reveal">
        <div class="ng-section-label ng-section-label--light">${escapeHtml(content.booking.label)}</div>
        <h2 id="book-title">${escapeHtml(content.booking.title)}</h2>
        <div class="wi-booking-details">
          <p><strong>${escapeHtml(content.booking.dates)}</strong><br />${escapeHtml(content.booking.location)}</p>
          <p><strong>${escapeHtml(content.booking.price)}</strong></p>
          <p>${escapeHtml(content.booking.includes)}</p>
          <p><strong>${escapeHtml(content.booking.capacity)}</strong></p>
        </div>
        <a class="button button--ghost-light wi-flyer-link" href="${escapeHtml(content.booking.flyerUrl)}" target="_blank" rel="noreferrer">${escapeHtml(content.booking.flyerCta)}</a>
      </div>
      <form class="ng-register__form reveal" id="wild-ideas-form">
        <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
        <label>Email address<input type="email" name="email" autocomplete="email" required /></label>
        <label>Your child’s age<input type="number" name="childAge" min="8" max="14" required /></label>
        <label>Anything you’d like us to know? <span>(optional)</span><textarea name="message" rows="3"></textarea></label>
        <button class="button button--sand" type="submit">${escapeHtml(content.booking.formCta)}</button>
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
const form = document.querySelector('#wild-ideas-form');

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
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  status.textContent = content.booking.success;
  button.disabled = true;
  button.textContent = 'Enquiry received';
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
