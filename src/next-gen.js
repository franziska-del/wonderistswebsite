import './styles.css';
import './next-gen.css';

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const form = document.querySelector('#next-gen-form');

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const nextState = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(nextState));
  nav.classList.toggle('is-open', nextState);
  document.body.classList.toggle('menu-open', nextState);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  status.textContent = 'You’re on the list. We’ll share the details as they take shape.';
  button.disabled = true;
  button.textContent = 'Interest registered';
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
