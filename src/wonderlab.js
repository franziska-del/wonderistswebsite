import './wonderlab.css';
import { submitForm } from './form-submit.js';

const arrow = '<svg viewBox="0 0 28 14" aria-hidden="true"><path d="M1 7h25M20 1l6 6-6 6" /></svg>';

const stories = [
  {
    title: 'Lessons from the edge',
    excerpt: 'What cliffs, tides, and tiny coastal flowers teach us about timing, perspective, and letting go.',
    read: '6 min read',
    image: '/assets/new-zealand.webp',
    alt: 'A dramatic green coastline meeting the sea',
    shape: 'portrait',
  },
  {
    title: 'Building a life, not just a plan',
    excerpt: 'How to design days that compound into meaningful years.',
    read: '7 min read',
    image: '/assets/wondercards.webp',
    alt: 'The Wondercards deck in use',
    shape: 'landscape',
  },
  {
    title: 'On starting before you’re ready',
    excerpt: 'A love letter to brave beginnings and imperfect action.',
    read: '5 min read',
    image: '/assets/uganda.webp',
    alt: 'A person outdoors in a vast natural landscape',
    shape: 'portrait',
  },
  {
    title: 'Don’t Be a Pussy (Unless That’s the Brave Part)',
    excerpt: 'Courage isn’t always forward motion. Sometimes it’s telling avoidance apart from self-abandonment.',
    read: '4 min read',
    image: '/assets/header-coast.png',
    alt: 'Sunset light over rugged ocean cliffs and a sandy shoreline',
    shape: 'landscape',
    href: '/wonderlab/dont-be-a-pussy/',
  },
];

const storyCard = (story) => {
  const href = story.href ?? '#newsletter';
  return `
  <article class="story story--${story.shape}">
    <a class="story__image" href="${href}" aria-label="Read ${story.title}">
      <img src="${story.image}" alt="${story.alt}" loading="lazy" />
    </a>
    <div class="story__body">
      <p class="story__meta">${story.read}</p>
      <h3><a href="${href}">${story.title}</a></h3>
      <p>${story.excerpt}</p>
      <a class="story__link" href="${href}">Read more ${arrow}</a>
    </div>
  </article>`;
};

document.querySelector('#app').innerHTML = `
  <header class="lab-header" data-header>
    <a class="lab-brand" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <button class="lab-menu" type="button" aria-expanded="false" aria-controls="lab-nav"><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav class="lab-nav" id="lab-nav" aria-label="Primary navigation">
      <a href="/#adventures">Adventures</a>
      <a href="/#wondercards">Wondercards</a>
      <a href="/#philosophy">Philosophy</a>
      <a class="is-current" href="/wonderlab/">Wonderlab</a>
      <a class="lab-nav__cta" href="/#say-hi">Say hello</a>
    </nav>
  </header>

  <main id="main">
    <section class="lab-intro" aria-labelledby="lab-title">
      <div class="lab-intro__heading">
        <h1 id="lab-title">wonderlab</h1>
        <p>A field journal for people building a life less ordinary.</p>
      </div>
      <div class="map-drawing" aria-hidden="true">
        <svg viewBox="0 0 500 190" fill="none">
          <path d="M28 129c38-4 45-35 77-33 40 2 46-44 88-34 34 8 52 43 87 32 27-9 28-46 73-42 31 3 45-17 98-21" />
          <path d="M21 147c50-6 58-36 91-37 35-1 49-42 80-39 49 6 55 52 94 43 32-7 39-39 69-41 30-3 49-31 104-32" />
          <path d="M84 38l9-17 9 17m-5-10v33M153 53l7-14 7 14m-4-9v24M260 37l9-18 9 18m-5-10v34M329 55l8-16 8 16m-4-9v27" />
          <path d="M410 107l17-17 17 17-17 17-17-17Zm17-39v78m-39-39h78" />
          <path d="M57 83c23-20 33-31 42-50M215 100c15-26 28-45 56-68M371 142c8-31 15-51 37-76" />
        </svg>
      </div>
    </section>

    <section class="featured" aria-labelledby="featured-title">
      <figure class="featured__image"><img src="/assets/hero.webp" alt="A woman in the wild, smiling toward the sun" /></figure>
      <div class="featured__copy">
        <p class="featured__meta">8 min read</p>
        <h2 id="featured-title">The beautiful trouble with certainty</h2>
        <div class="ember-rule"></div>
        <p>Certainty feels safe. It draws a map, builds the fence, and tells us where the edge is. But wonder lives beyond the fence.</p>
        <a class="read-link" href="#newsletter">Read the story ${arrow}</a>
      </div>
    </section>

    <section class="field-notes" aria-labelledby="field-notes-title">
      <div class="section-heading"><h2 id="field-notes-title">Latest field notes</h2><span></span><i aria-hidden="true">✳</i></div>
      <div class="stories">${stories.map(storyCard).join('')}</div>
    </section>

    <section class="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div class="newsletter__copy">
        <h2 id="newsletter-title">Keep a little wonder close</h2>
        <p>Field notes, reflections, and resources to inspire curious minds and courageous lives.</p>
      </div>
      <form class="newsletter__form">
        <label class="form-honeypot" aria-hidden="true">Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off" /></label>
        <label class="sr-only" for="lab-email">Your email address</label>
        <input id="lab-email" type="email" name="email" placeholder="Your email address" autocomplete="email" required />
        <button type="submit">Join the journal</button>
        <p class="newsletter__note" role="status">No spam. Just the good stuff.</p>
      </form>
    </section>
  </main>

  <footer class="lab-footer"><p>© ${new Date().getFullYear()} The Wonderists</p><a href="#main">Back to the top ↑</a></footer>
`;

const menu = document.querySelector('.lab-menu');
const nav = document.querySelector('.lab-nav');
const setMenu = (open) => {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });

const form = document.querySelector('.newsletter__form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm({
    form,
    subject: 'New Wonderlab newsletter subscriber',
    successMessage: 'You’re on the list. Welcome to Wonderlab.',
    errorMessage: 'We couldn’t add you to the journal. Please try again.',
  });
});

const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
