import './wonderlab.css';
import { article, meta } from './content/dont-be-a-pussy.json';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const paragraphs = (items) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');

document.title = meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);

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
    <article class="article-hero">
      <a class="article-back" href="/wonderlab/">← Back to Wonderlab</a>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="article-meta">${escapeHtml(article.read)}</p>
      <figure class="article-hero__image">
        <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.imageAlt)}" />
      </figure>
      <div class="article-body">
        ${paragraphs(article.bodyBefore)}
        <blockquote class="article-pull">${escapeHtml(article.pullQuote)}</blockquote>
        ${paragraphs(article.bodyAfter)}
        <p class="article-closing">${escapeHtml(article.closingStatement)}</p>
      </div>
    </article>
  </main>

  <footer class="lab-footer"><p>© ${new Date().getFullYear()} The Wonderists</p><a href="/wonderlab/">Back to Wonderlab ↑</a></footer>
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

const header = document.querySelector('[data-header]');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
