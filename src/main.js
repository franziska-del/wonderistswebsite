import './styles.css';

const arrowIcon = `
  <svg viewBox="0 0 30 16" aria-hidden="true">
    <path d="M1 8h27M21 1l7 7-7 7" />
  </svg>`;

const adventures = [
  {
    id: 'uganda',
    number: '01',
    title: 'Explore Uganda by motorbike',
    cta: 'Explore Uganda',
    image: '/assets/uganda.webp',
    description:
      'Travel through Uganda by motorcycle with a small group of entrepreneurs. Ride through unfamiliar territory, experience the country beyond the usual tourist trail and connect with local people and projects along the way.',
  },
  {
    id: 'new-zealand',
    number: '02',
    title: 'Explore New Zealand by motorbike',
    cta: 'Explore New Zealand',
    image: '/assets/new-zealand.webp',
    description:
      'A motorcycle adventure through one of the world’s greatest riding destinations. Breathtaking landscapes, incredible roads and the kind of business conversations that happen when everyone has stepped away from business as usual.',
  },
  {
    id: 'mentawai',
    number: '03',
    title: 'Surf the Mentawai Islands',
    cta: 'Explore Mentawai',
    image: '/assets/mentawai.webp',
    description:
      'Leave the boardroom behind and head for one of the world’s most celebrated surf regions on a luxury boat. Days in the water. Evenings with an intimate group of entrepreneurs. Time to think, talk and remember what it feels like to be completely absorbed in something.',
  },
  {
    id: 'next-gen',
    number: '04',
    title: 'The Wonderists: Next Gen',
    cta: 'Explore Next Gen',
    href: '/next-gen/',
    image: '/assets/next-gen.webp',
    description:
      'An adventure for entrepreneurial parents and the next generation. Step away from the usual routine and take on new challenges side by side. Get curious, try things you haven’t done before, practise the skills most useful for the future, meet interesting people and create the kind of stories your kids will still remember years from now.',
  },
];

const adventureCard = (adventure, featured = false) => `
  <article class="adventure-card ${featured ? 'adventure-card--featured' : ''} reveal">
    <img src="${adventure.image}" alt="" ${featured ? '' : 'loading="lazy"'} />
    <div class="adventure-card__shade"></div>
    <div class="adventure-card__content">
      <span class="adventure-number">${adventure.number}</span>
      <h3>${adventure.title}</h3>
      ${adventure.href
        ? `<a class="text-link text-link--light" href="${adventure.href}">${adventure.cta}${arrowIcon}</a>`
        : `<button class="text-link text-link--light js-adventure" data-adventure="${adventure.id}">${adventure.cta}${arrowIcon}</button>`}
    </div>
  </article>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="The Wonderists home">
      <img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" />
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Open menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="#adventures">Adventures</a>
      <a href="#wondercards">Wondercards</a>
      <a href="#philosophy">The Philosophy</a>
      <button class="nav-cta js-contact" type="button">Say Hi</button>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__copy">
        <h1 id="hero-title" class="reveal">Fully alive,<br />while alive.</h1>
        <div class="hero__body reveal">
          <p>The Wonderists creates adventures and tools for entrepreneurs who want to stay curious, test their edges and feel more alive.</p>
          <p>Choose adventures that challenge you. Ask better questions. Spend time with interesting, curious people who make you think differently.</p>
        </div>
        <div class="button-row reveal">
          <a class="button button--primary" href="#adventures">Explore Adventures</a>
          <a class="button button--outline" href="#wondercards">Discover Wondercards</a>
        </div>
      </div>
      <figure class="hero__media">
        <img src="/assets/hero.webp" alt="A motorcyclist paused above a winding coastal road" />
        <figcaption>There is more life beyond business as usual.</figcaption>
      </figure>
    </section>

    <section class="manifesto" aria-labelledby="manifesto-title">
      <div class="manifesto__texture" aria-hidden="true">
        <span>Stay awake.</span>
      </div>
      <div class="manifesto__copy reveal">
        <h2 id="manifesto-title">Being alive and feeling alive are not the same thing.</h2>
        <div class="ember-rule"></div>
        <p>It’s easy for life to become a list of things that need your attention.</p>
        <p>The business needs you. People rely on you. The calendar fills up. And the adventurous, curious part of you keeps getting told, “maybe later”.</p>
        <p>The Wonderists create experiences that take you somewhere unfamiliar, put you around interesting people and ask you to stretch beyond what you already know in order to grow.</p>
        <p>Sometimes physically. Sometimes intellectually. Sometimes simply by having a conversation you wouldn’t normally have.</p>
        <p class="manifesto__statement">Your business gets your attention.<br /><strong>Your life should too.</strong></p>
      </div>
    </section>

    <section class="adventures" id="adventures" aria-labelledby="adventures-title">
      <div class="adventures__intro reveal">
        <h2 id="adventures-title">Choose your<br />next adventure.</h2>
        <div class="ember-rule"></div>
        <p>Small-group experiences for entrepreneurs who want challenge, friendship and a few stories worth telling.</p>
      </div>
      ${adventureCard(adventures[0], true)}
      <div class="adventures__rail">
        ${adventures.slice(1).map((item) => adventureCard(item)).join('')}
      </div>
    </section>

    <section class="adventure-story" aria-labelledby="story-title">
      <div class="adventure-story__heading reveal">
        <h2 id="story-title">Adventure changes the conversation.</h2>
        <svg viewBox="0 0 120 20" aria-hidden="true"><path d="M0 10h116M106 2l10 8-10 8" /></svg>
      </div>
      <div class="adventure-story__copy reveal">
        <p>The Wonderists brings together people who love adventures, discovering new things and building successful businesses at the same time.</p>
        <p>Each adventure combines challenge, curiosity, interesting people and meaningful encounters with the places we visit.</p>
        <p>You’ll come for the adventure. You may leave with new friends, a clearer head and a bigger sense of what’s possible.</p>
      </div>
    </section>

    <section class="wondercards" id="wondercards" aria-labelledby="wondercards-title">
      <div class="wondercards__copy reveal">
        <h2 id="wondercards-title">Bring a little wonder into ordinary life.</h2>
        <p>Wondercards are conversation cards designed to get people curious, talking and beyond the usual surface-level stuff.</p>
        <p>They are perfectly used with your family, friends, partners, teams or randos you just met.</p>
        <p>Each card asks a question that might make you laugh, think, reveal something unexpected or see someone differently.</p>
        <p>Think of them as the everyday version of a Wonderists adventure.</p>
        <p class="shipping">Shipping available worldwide.</p>
        <button class="button button--sand js-contact" type="button" data-interest="Wondercards">Discover Wondercards</button>
      </div>
      <div class="wondercards__media reveal">
        <img src="/assets/wondercards.webp" loading="lazy" alt="Wondercards conversation card deck and four question cards" />
      </div>
    </section>

    <section class="philosophy" id="philosophy" aria-labelledby="philosophy-title">
      <div class="philosophy__lead reveal">
        <img class="philosophy__mark" src="/assets/wonderists-logo-script.png" alt="" aria-hidden="true" />
        <h2 id="philosophy-title">Stay curious.<br />Stay courageous.<br />Stay connected.</h2>
        <p>The more we automate, optimise and outsource, the more valuable it becomes to think for ourselves.</p>
        <p>Wonderism is a philosophy built around curiosity, courage and connection.</p>
        <p>Question what you’ve accepted. Try things you might fail at. Spend time with people who challenge your thinking. Go somewhere unfamiliar. Stay open to changing your mind.</p>
        <p>We don’t have all the answers. We’d rather go and find out.</p>
      </div>
      <div class="definitions reveal">
        <article>
          <h3>Wonderism*</h3>
          <p>The philosophy of staying awake to life, living fully alive.</p>
        </article>
        <article>
          <h3>Wonderist*</h3>
          <p>Someone who chooses curiosity over certainty, courage over comfort, presence over distraction, and aliveness over autopilot.</p>
        </article>
      </div>
    </section>

    <section class="closing" id="say-hi" aria-labelledby="closing-title">
      <div class="closing__copy reveal">
        <h2 id="closing-title">Your life is<br />happening now.</h2>
        <p>There will always be another deadline, another responsibility and another reason to wait.</p>
        <p><strong>Choose the experience that makes you a little nervous.<br />We’ll meet you there.</strong></p>
      </div>
      <div class="closing__actions reveal">
        <a class="button button--sand" href="#adventures">Explore adventures</a>
        <button class="button button--ghost-light js-contact" type="button">Say hi</button>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand brand--footer" href="#top" aria-label="Back to the top">
      <img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" />
    </a>
    <div class="site-footer__social" aria-label="Social channels">
      <span>Instagram</span>
      <span>LinkedIn</span>
    </div>
    <p>© ${new Date().getFullYear()} The Wonderists</p>
  </footer>

  <dialog class="contact-dialog" id="interest-dialog" aria-labelledby="dialog-title">
    <button class="dialog-close" type="button" aria-label="Close dialog">×</button>
    <div class="dialog-number" aria-hidden="true">*</div>
    <h2 id="dialog-title">Choose the thing that makes you curious.</h2>
    <p id="dialog-description">Tell us where you’d like to go. We’ll keep you in the loop.</p>
    <form id="interest-form">
      <label>
        Your name
        <input type="text" name="name" autocomplete="name" required />
      </label>
      <label>
        Email address
        <input type="email" name="email" autocomplete="email" required />
      </label>
      <label>
        I’m interested in
        <select name="interest" id="interest-select">
          ${adventures.map((item) => `<option value="${item.title}">${item.title}</option>`).join('')}
          <option value="Wondercards">Wondercards</option>
          <option value="A conversation">A conversation</option>
        </select>
      </label>
      <button class="button button--primary" type="submit">Count me curious</button>
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
    dialogTitle.textContent = adventure.title;
    dialogDescription.textContent = adventure.description;
    interestSelect.value = adventure.title;
    dialog.showModal();
  });
});

document.querySelectorAll('.js-contact').forEach((button) => {
  button.addEventListener('click', () => {
    dialogTitle.textContent = button.dataset.interest === 'Wondercards'
      ? 'Bring a little wonder into ordinary life.'
      : 'Say hi.';
    dialogDescription.textContent = button.dataset.interest === 'Wondercards'
      ? 'Tell us where in the world your Wondercards should travel.'
      : 'Tell us what you’re curious about. We’d love to hear from you.';
    interestSelect.value = button.dataset.interest || 'A conversation';
    closeMenu();
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  const outside =
    event.clientX < box.left || event.clientX > box.right ||
    event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  status.textContent = 'You’re on the list. We’ll meet you there.';
  form.querySelector('button[type="submit"]').disabled = true;
  setTimeout(() => {
    dialog.close();
    form.reset();
    status.textContent = '';
    form.querySelector('button[type="submit"]').disabled = false;
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
