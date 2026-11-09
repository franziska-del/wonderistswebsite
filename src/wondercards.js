import './styles.css';
import './wondercards.css';
import settings from './content/wondercards.json';

// Checkout link and quote toggle live in src/content/wondercards.json.
const checkoutUrl = settings.checkoutUrl || '#order';
const img = '/assets/wondercards';

const orderButton = () => `<a class="wc-button" href="${checkoutUrl}" data-cta="order">Order your Wondercards · $39</a>`;

const themes = [
  { name: 'Inside Your Head', colour: 'var(--card-yellow)', example: 'Where do thoughts come from before you think them?' },
  { name: 'People Are Weird', colour: 'var(--card-blue)', example: 'What’s something humans do every day that would look completely ridiculous to aliens?' },
  { name: 'Who made this up?', colour: 'var(--card-pink)', example: 'What do adults take too seriously?' },
  { name: 'The Wild Unknown', colour: 'var(--card-green)', example: 'If children ran the world for a day, what would they do better than adults?' },
  { name: 'Roads Not Taken', colour: 'var(--card-orange)', example: 'What’s one road you didn’t take that you’re still curious about?' },
];

const steps = [
  ['01', 'Draw a card', 'Shuffle, pick, done. No strategy, no scorekeeping, no one reading instructions aloud while everyone loses the will to live.'],
  ['02', 'Ask it out loud', 'To your partner, your kids, your team, or the friend who swears they have no interesting stories. They do. They’ve just never been asked.'],
  ['03', 'Follow the tangent', 'The printed question is only the doorway. The good stuff usually turns up three questions later, somewhere nobody expected to go.'],
];

const uses = [
  ['Friends', 'For the night that would otherwise end in a debate about property prices.'],
  ['Families', 'Breakfast questions that get more than “fine” out of a twelve-year-old. Possibly. No promises.'],
  ['Couples', 'For year one and year twenty. You haven’t run out of things to learn about each other, you’ve just stopped asking.'],
  ['Teams', 'An offsite opener that beats two truths and a lie by a considerable distance.'],
];

const photos = [
  ['box-with-drinks.jpg', 'Wondercards box beside drinks on a dark table'],
  ['orange-cards-sunflowers.jpg', 'Orange round Wondercards spread beside sunflowers and an open art book'],
  ['box-on-chessboard.jpg', 'Wondercards box on a chessboard next to The Courage Map book'],
  ['yellow-card-sunflowers.jpg', 'A yellow Wondercard held up among sunflowers'],
];

// Featured quote. Set "showQuote" to false in src/content/wondercards.json to remove it.
const quote = `
    <section class="wc-quote" aria-label="What people say">
      <figure>
        <span class="wc-quote__mark" aria-hidden="true">“</span>
        <blockquote>“These are great! I’m going to use them with my guests.”</blockquote>
        <figcaption>Sir Richard Branson</figcaption>
      </figure>
    </section>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header" data-header>
    <a class="brand" href="/" aria-label="The Wonderists home">
      <img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" />
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Open menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
      <a href="#how">How it works</a>
      <a href="#inside">What’s inside</a>
      <a href="/#adventures">Adventures</a>
      <a href="/wonderlab/">Wonderlab</a>
    </nav>
  </header>

  <main id="main">
    <section class="wc-hero wc-wrap" aria-labelledby="wc-title">
      <div class="wc-hero__copy">
        <p class="wc-hero__name">Wondercards</p>
        <h1 id="wc-title" class="wc-script">The future belongs to the curious</h1>
        <p class="wc-hero__lead">Small box. Big questions. Occasionally questionable answers.</p>
        <p class="wc-body">For people who are tired of small talk and hungry for soul talk. Draw a card at dinner, on a road trip or halfway through a glass of wine, and watch an ordinary evening wander somewhere nobody planned. Small talk is a polite way of staying strangers. These cards are the way out.</p>
        <div class="wc-actions">${orderButton()}</div>
        <p class="wc-note">56 round cards · Free shipping</p>
      </div>
      <div class="wc-hero__media">
        <div class="wc-hero__frame">
          <img src="${img}/hero-pink-card-window.jpg" alt="A hand holding a round pink Wondercard at a plane window that reads: Are we really as free as we think we are?" width="1050" height="1400" fetchpriority="high" />
          <div class="wc-sticker" aria-hidden="true">No small<br />talk.</div>
        </div>
      </div>
    </section>

    <section class="wc-why" aria-labelledby="wc-why-title">
      <div class="wc-wrap wc-split">
        <div class="wc-why__head">
          <span class="wc-eyebrow">Why these exist</span>
          <h2 id="wc-why-title" class="wc-h2">We’ve never had more ways to talk, or less to say.</h2>
        </div>
        <div class="wc-why__body">
          <p>Group chats, feeds, the same three conversations on rotation. Most of us aren’t short on company. We’re short on curiosity, the kind that makes you lean across the table and say, wait, really?</p>
          <p class="wc-script wc-script--line">Less scrolling. More wondering.</p>
        </div>
      </div>
    </section>

    <section class="wc-how wc-wrap wc-stack" id="how" aria-labelledby="wc-how-title">
      <h2 id="wc-how-title" class="wc-script wc-centre"><span class="wc-arrowed">Let’s have some fun!<svg class="wc-arrow" viewBox="0 0 160 8" aria-hidden="true"><path d="M0 4h148" /><path class="wc-arrow__head" d="M146 0l10 4-10 4z" /></svg></span></h2>
      <div class="wc-steps">
        ${steps.map(([n, title, body]) => `
        <div class="wc-box wc-step">
          <span class="wc-step__num">${n}</span>
          <h3>${title}</h3>
          <p>${body}</p>
        </div>`).join('')}
      </div>
    </section>

    <section class="wc-where wc-wrap wc-stack" aria-labelledby="wc-where-title">
      <div class="wc-where__intro">
        <h2 id="wc-where-title" class="wc-script">Made for experiences of all kinds</h2>
        <p>Kitchen tables, boardroom tables, picnic rugs and the front seat of a car four hours into a road trip.</p>
      </div>
      <div class="wc-photos">
        ${photos.map(([file, alt]) => `<img src="${img}/${file}" alt="${alt}" loading="lazy" width="600" height="800" />`).join('')}
      </div>
      <div class="wc-uses">
        ${uses.map(([title, body]) => `
        <div class="wc-use">
          <h3>${title}</h3>
          <p>${body}</p>
        </div>`).join('')}
      </div>
    </section>

    <section class="wc-inside" id="inside" aria-labelledby="wc-inside-title">
      <div class="wc-wrap wc-split wc-split--centre">
        <div class="wc-inside__copy">
          <h2 id="wc-inside-title" class="wc-h2">What’s in the box</h2>
          <div>
            <div class="wc-row"><span>Cards</span><span>56 round question cards</span></div>
            <div class="wc-themes">
              <span class="wc-themes__title">Five themes, one colour each</span>
              ${themes.map((t) => `
              <div class="wc-theme">
                <span class="wc-dot" style="background: ${t.colour}"></span>
                <div><span class="wc-theme__name">${t.name}</span><span class="wc-theme__q">${t.example}</span></div>
              </div>`).join('')}
            </div>
          </div>
          <div class="wc-actions">${orderButton()}<span class="wc-note">Free shipping</span></div>
        </div>
        <div class="wc-inside__media">
          <img src="${img}/box-on-table.jpg" alt="The blue Wondercards box on a glass table" loading="lazy" width="1400" height="1050" />
          <p class="wc-script wc-script--line">Small box. Big questions.</p>
        </div>
      </div>
    </section>
${settings.showQuote ? quote : ''}
    <section class="wc-close" aria-labelledby="wc-close-title">
      <img src="${img}/teal-cards-fan.jpg" alt="A hand fanning out teal Wondercards at a plane window" loading="lazy" width="220" height="220" />
      <span class="wc-eyebrow">Ignite curiosity · Invite courage · Inspire connection</span>
      <h2 id="wc-close-title" class="wc-script wc-script--xl">Let’s ruin small talk!</h2>
      <p>Keep a deck on the dinner table, in the glovebox or in your bag. The evenings you remember rarely start with “so, how was work?”</p>
      ${orderButton()}
      <p class="wc-note">Free shipping</p>
    </section>
  </main>

  <footer class="site-footer wc-footer">
    <a class="brand brand--footer" href="/" aria-label="The Wonderists home"><img src="/assets/wonderists-logo-primary.png" alt="The Wonderists" /></a>
    <span>Wondercards are a Wonderists tool for staying curious, together.</span>
    <p class="wc-footer__script">Fully alive, while alive</p>
  </footer>
`;

// Header: mobile menu and scrolled state, matching the home page.
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const menuLabel = menuButton.querySelector('.sr-only');

const setMenuState = (isOpen, { returnFocus = false } = {}) => {
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuLabel.textContent = isOpen ? 'Close menu' : 'Open menu';
  nav.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  if (isOpen) nav.querySelector('a')?.focus({ preventScroll: true });
  else if (returnFocus) menuButton.focus({ preventScroll: true });
};

menuButton.addEventListener('click', () => setMenuState(menuButton.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenuState(false, { returnFocus: true });
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && menuButton.getAttribute('aria-expanded') === 'true') setMenuState(false);
});

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
