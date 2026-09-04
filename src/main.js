import './styles.css';
import content from './content/home.json';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const withBreaks = (value) => escapeHtml(value).replaceAll('\n', '<br />');
const paragraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');

document.title = content.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);

const arrowIcon = `
  <svg viewBox="0 0 30 16" aria-hidden="true">
    <path d="M1 8h27M21 1l7 7-7 7" />
  </svg>`;

const wildIdeasFallback = content.adventures.items.find((item) => item.id === 'wild-ideas');
const adventures = [...content.adventures.items]
  .map((item) => (
    item.id === 'wild-ideas' && item.image === '/assets/next-gen.webp'
      ? { ...item, image: wildIdeasFallback.image }
      : item
  ))
  .sort((first, second) => {
    if (first.id === 'wild-ideas') return -1;
    if (second.id === 'wild-ideas') return 1;
    return 0;
  })
  .map((item, index) => ({ ...item, number: String(index + 1).padStart(2, '0') }));

const adventureCard = (adventure, featured = false) => `
  <article class="adventure-card ${featured ? 'adventure-card--featured' : ''} reveal">
    <img src="${escapeHtml(adventure.image)}" alt="" ${featured ? '' : 'loading="lazy"'} />
    <div class="adventure-card__shade"></div>
    <div class="adventure-card__content">
      <span class="adventure-number">${escapeHtml(adventure.number)}</span>
      <h3>${escapeHtml(adventure.title)}</h3>
      ${adventure.href
        ? `<a class="text-link text-link--light" href="${escapeHtml(adventure.href)}">${escapeHtml(adventure.cta)}${arrowIcon}</a>`
        : `<p class="adventure-card__application">A curated adventure for entrepreneurs.</p><button class="text-link text-link--light js-adventure" data-adventure="${escapeHtml(adventure.id)}">Apply for this adventure${arrowIcon}</button>`}
    </div>
  </article>`;

const socialLink = (label, url) => url
  ? `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
  : `<span>${escapeHtml(label)}</span>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="The Wonderists home">
      <img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" />
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Open menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="#adventures">${escapeHtml(content.navigation.adventures)}</a>
      <a href="#wondercards">${escapeHtml(content.navigation.wondercards)}</a>
      <a href="#philosophy">${escapeHtml(content.navigation.philosophy)}</a>
      <a href="/wonderlab/">Wonderlab</a>
      <button class="nav-cta js-contact" type="button">${escapeHtml(content.navigation.contact)}</button>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__copy">
        <h1 id="hero-title" class="reveal">${withBreaks(content.hero.title)}</h1>
        <div class="hero__body reveal">${paragraphs(content.hero.body)}</div>
        <div class="button-row reveal">
          <a class="button button--primary" href="#adventures">${escapeHtml(content.hero.primaryCta)}</a>
          <a class="button button--outline" href="#wondercards">${escapeHtml(content.hero.secondaryCta)}</a>
        </div>
      </div>
      <figure class="hero__media">
        <img src="${escapeHtml(content.hero.image)}" alt="${escapeHtml(content.hero.imageAlt)}" />
        <figcaption>${escapeHtml(content.hero.caption)}</figcaption>
      </figure>
    </section>

    <section class="manifesto" aria-labelledby="manifesto-title">
      <div class="manifesto__texture" aria-hidden="true"><span>${escapeHtml(content.manifesto.texture)}</span></div>
      <div class="manifesto__copy reveal">
        <h2 id="manifesto-title">${escapeHtml(content.manifesto.title)}</h2>
        <div class="ember-rule"></div>
        ${paragraphs(content.manifesto.body)}
        <p class="manifesto__statement">${escapeHtml(content.manifesto.statement)}<br /><strong>${escapeHtml(content.manifesto.statementStrong)}</strong></p>
      </div>
    </section>

    <section class="adventures" id="adventures" aria-labelledby="adventures-title">
      <div class="adventures__intro reveal">
        <h2 id="adventures-title">${withBreaks(content.adventures.title)}</h2>
        <div class="ember-rule"></div>
        <p>${escapeHtml(content.adventures.intro)}</p>
      </div>
      ${adventureCard(adventures[0], true)}
      <div class="adventures__rail">${adventures.slice(1).map((item) => adventureCard(item)).join('')}</div>
    </section>

    <section class="adventure-story" aria-labelledby="story-title">
      <div class="adventure-story__heading reveal">
        <h2 id="story-title">${escapeHtml(content.adventureStory.title)}</h2>
        <svg viewBox="0 0 120 20" aria-hidden="true"><path d="M0 10h116M106 2l10 8-10 8" /></svg>
      </div>
      <div class="adventure-story__copy reveal">${paragraphs(content.adventureStory.body)}</div>
    </section>

    <section class="wondercards" id="wondercards" aria-labelledby="wondercards-title">
      <div class="wondercards__copy reveal">
        <h2 id="wondercards-title">${escapeHtml(content.wondercards.title)}</h2>
        ${paragraphs(content.wondercards.body)}
        <p class="shipping">${escapeHtml(content.wondercards.shipping)}</p>
        <div class="button-row">
          <button class="button button--sand js-contact" type="button" data-interest="Wondercards">${escapeHtml(content.wondercards.cta)}</button>
        </div>
        <aside class="unspoken-card">
          <p class="unspoken-card__eyebrow">Also from The Wonderists</p>
          <h3>${escapeHtml(content.wondercards.unspokenTitle)}</h3>
          <p>${escapeHtml(content.wondercards.unspokenBody)}</p>
          <a class="text-link text-link--light" href="${escapeHtml(content.wondercards.unspokenUrl)}" target="_blank" rel="noreferrer">${escapeHtml(content.wondercards.unspokenCta)}${arrowIcon}</a>
        </aside>
      </div>
      <div class="wondercards__media reveal">
        <img src="${escapeHtml(content.wondercards.image)}" loading="lazy" alt="${escapeHtml(content.wondercards.imageAlt)}" />
      </div>
    </section>

    <section class="philosophy" id="philosophy" aria-labelledby="philosophy-title">
      <div class="philosophy__lead reveal">
        <img class="philosophy__mark" src="/assets/wonderists-logo-script.png" alt="" aria-hidden="true" />
        <h2 id="philosophy-title">${withBreaks(content.philosophy.title)}</h2>
        ${paragraphs(content.philosophy.body)}
      </div>
      <div class="definitions reveal">
        ${content.philosophy.definitions.map((item) => `
          <article><h3>${escapeHtml(item.term)}</h3><p>${escapeHtml(item.definition)}</p></article>`).join('')}
      </div>
    </section>

    <section class="closing" id="say-hi" aria-labelledby="closing-title">
      <div class="closing__copy reveal">
        <h2 id="closing-title">${withBreaks(content.closing.title)}</h2>
        <p>${escapeHtml(content.closing.body)}</p>
        <p><strong>${withBreaks(content.closing.statement)}</strong></p>
      </div>
      <div class="closing__actions reveal">
        <a class="button button--sand" href="#adventures">${escapeHtml(content.closing.primaryCta)}</a>
        <a class="button button--ghost-light" href="#wondercards">${escapeHtml(content.closing.secondaryCta)}</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand brand--footer" href="#top" aria-label="Back to the top"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <div class="site-footer__social" aria-label="Social channels">
      ${socialLink(content.footer.instagramLabel, content.footer.instagramUrl)}
      ${socialLink(content.footer.linkedinLabel, content.footer.linkedinUrl)}
    </div>
    <p>© ${new Date().getFullYear()} The Wonderists</p>
  </footer>

  <dialog class="contact-dialog" id="interest-dialog" aria-labelledby="dialog-title">
    <button class="dialog-close" type="button" aria-label="Close dialog">×</button>
    <div class="dialog-number" aria-hidden="true">*</div>
    <h2 id="dialog-title">${escapeHtml(content.contact.defaultTitle)}</h2>
    <p id="dialog-description">${escapeHtml(content.contact.defaultDescription)}</p>
    <form id="interest-form">
      <div class="form-fields form-fields--contact">
        <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
        <label>Email address<input type="email" name="email" autocomplete="email" required /></label>
      </div>
      <div class="form-fields form-fields--application" hidden>
        <label>Phone number<input type="tel" name="phone" autocomplete="tel" /></label>
        <label>Business<input type="text" name="business" autocomplete="organization" /></label>
        <label>One of your favourite rides<textarea name="favouriteRide" rows="2"></textarea></label>
        <label>Why would you love to join this adventure?<textarea name="whyJoin" rows="3"></textarea></label>
      </div>
      <label class="interest-field">I’m interested in
        <select name="interest" id="interest-select">
          ${adventures.map((item) => `<option value="${escapeHtml(item.title)}">${escapeHtml(item.title)}</option>`).join('')}
          <option value="Wondercards">Wondercards</option>
          <option value="A conversation">A conversation</option>
        </select>
      </label>
      <button class="button button--primary" type="submit">${escapeHtml(content.contact.formCta)}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </dialog>
`;

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const dialog = document.querySelector('#interest-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const interestSelect = document.querySelector('#interest-select');
const form = document.querySelector('#interest-form');
const contactFields = document.querySelector('.form-fields--contact');
const applicationFields = document.querySelector('.form-fields--application');
const formSubmitButton = form.querySelector('button[type="submit"]');

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

document.querySelectorAll('.js-adventure').forEach((button) => {
  button.addEventListener('click', () => {
    const adventure = adventures.find((item) => item.id === button.dataset.adventure);
    dialogTitle.textContent = content.contact.applicationTitle;
    dialogDescription.textContent = content.contact.applicationDescription;
    interestSelect.value = adventure.title;
    contactFields.hidden = false;
    applicationFields.hidden = false;
    document.querySelector('.interest-field').hidden = true;
    applicationFields.querySelectorAll('input, textarea').forEach((field) => { field.required = true; });
    formSubmitButton.textContent = content.contact.applicationCta;
    dialog.showModal();
  });
});

document.querySelectorAll('.js-contact').forEach((button) => {
  button.addEventListener('click', () => {
    const isWondercards = button.dataset.interest === 'Wondercards';
    dialogTitle.textContent = isWondercards ? content.contact.wondercardsTitle : content.contact.defaultTitle;
    dialogDescription.textContent = isWondercards ? content.contact.wondercardsDescription : content.contact.defaultDescription;
    interestSelect.value = button.dataset.interest || 'A conversation';
    applicationFields.hidden = true;
    document.querySelector('.interest-field').hidden = false;
    applicationFields.querySelectorAll('input, textarea').forEach((field) => { field.required = false; });
    formSubmitButton.textContent = content.contact.formCta;
    closeMenu();
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  status.textContent = applicationFields.hidden ? content.contact.success : content.contact.applicationSuccess;
  formSubmitButton.disabled = true;
  setTimeout(() => {
    dialog.close();
    form.reset();
    status.textContent = '';
    formSubmitButton.disabled = false;
  }, 1700);
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
