import './styles.css';
import './unspoken.css';

document.querySelector('#app').innerHTML = `
  <header class="unspoken-header">
    <a class="unspoken-wordmark" href="/">THE WONDERISTS</a>
    <a class="unspoken-back" href="/#wondercards">Back to Wondercards</a>
  </header>
  <main id="main">
    <section class="unspoken-hero" aria-labelledby="unspoken-title">
      <div class="unspoken-hero__copy">
        <p class="unspoken-name">UNSPOKEN<br />CARDS</p>
        <h1 id="unspoken-title">Say the<br /><em>thing.</em></h1>
        <p>Unspoken Cards are prompts for the conversations that rarely happen by accident.</p>
        <div class="button-row">
          <a class="unspoken-button" href="#get-the-cards">Get the cards</a>
          <a class="unspoken-link" href="#how-it-works">How it works <span>→</span></a>
        </div>
      </div>
      <div class="unspoken-hero__art" aria-label="A colourful stack of Unspoken conversation cards">
        <div class="unspoken-card-art unspoken-card-art--back">UNSPOKEN<br />CARDS</div>
        <div class="unspoken-card-art unspoken-card-art--middle">What are you<br />still carrying?</div>
        <div class="unspoken-card-art unspoken-card-art--front">When did you<br />last feel seen?</div>
      </div>
    </section>
    <section class="unspoken-intro" id="how-it-works">
      <p class="unspoken-section-name">UNSPOKEN CARDS</p>
      <h2>Questions make<br />room.</h2>
      <div><p>Some things are hard to say. Some questions are worth asking anyway.</p><p>Pull a card with a friend, a partner, your team or someone you’ve only just met. There are no right answers—just a little more room for what matters.</p></div>
    </section>
    <section class="unspoken-get" id="get-the-cards">
      <h2>Ready for a real conversation?</h2>
      <p>A deck of prompts for the things that matter, from The Wonderists.</p>
      <a class="unspoken-button unspoken-button--light" href="mailto:hello@thewonderists.com?subject=Unspoken%20Cards">Get the cards</a>
    </section>
  </main>
  <footer class="unspoken-footer"><a href="/">The Wonderists</a><span>© ${new Date().getFullYear()}</span></footer>
`;
