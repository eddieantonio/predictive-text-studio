<script lang="ts">
  import Upload from "../components/Upload.svelte";
  import BCP47Tag from "../components/BCP47Tag.svelte";
</script>

<style>
  :global(body) {
    display: flex;

    min-height: 100vh;
    margin: 0;
    padding: 0;

    flex-flow: column nowrap;
  }

  :global(:root) {
    --body-max-width: 960px;

    background-color: var(--white);

    scroll-behavior: smooth;
  }

  main {
    flex: 1;
    --quick-start-max-width: calc(var(--body-max-width) / 2);

    margin-bottom: 2rem;
  }

  .masthead {
    /* These hacky variables are here */
    --wave-height: 322px;
    --masthead-space-top: 3rem;
    --masthead-content-height: 20rem;
    --masthead-solid-color-height: calc(
      var(--masthead-space-top) + var(--masthead-content-height)
    );
    --masthead-background-color: #09f;

    width: 100vw;
    padding-top: var(--masthead-space-top);
    padding-bottom: var(--wave-height);

    color: var(--white);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-image: url(assets/wave.svg),
      linear-gradient(
        to bottom,
        var(--masthead-background-color) 0,
        var(--masthead-background-color) var(--masthead-solid-color-height),
        rgba(255, 255, 255, 0) var(--masthead-solid-color-height)
      );
  }

  .masthead__content {
    display: flex;
    width: 80vw;
    max-width: var(--body-max-width);
    margin: auto;

    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
  }

  .masthead__brand {
    display: block;
    height: 2rem;
    margin-bottom: 2rem;

    /* fallback font styles in case the image doesn't load */
    font-weight: bold;
    color: var(--black, #111);
  }

  .masthead__title {
    font-size: 2.5em;
    font-weight: 700;
  }

  .masthead__description {
    font-size: 1.25em;
  }

  .explanation {
    margin: 2rem;

    text-align: center;
  }

  .quick-start {
    margin: 9rem auto;
    min-width: 20em;
    max-width: var(--quick-start-max-width);
  }

  .quick-start__step {
    margin: 0 0 2rem;
    border: 0;
    padding: 0;

    font-size: 1.5em;
    line-height: 1.5;
  }

  .quick-start__submit {
    margin: 2rem 0;
    width: 100%;
  }

  .footer {
    padding: 1rem;

    color: var(--white, #fff);
    background-color: var(--gray-dark);
  }

  .footer a:link,
  .footer a:visited,
  .footer a:active {
    color: inherit;
  }

  .footer a:hover {
    color: var(--gray-light);
  }

  .footer__copyright {
    margin: auto;
    max-width: var(--body-max-width);
  }

  .block {
    display: block;

    margin: 1rem auto 2rem;
  }
</style>

<svelte:head>
  <title>Welcome to Predictive Text Studio</title>
  <meta
    name="description"
    content="Add prediction and autocorrect to your language" />
</svelte:head>

<main>
  <header class="masthead">
    <!-- wrapper div required to do margin: auto; trick -->
    <div class="masthead__content">
      <div class="masthead__copy">
        <h1 class="masthead__title">
          <img class="masthead__brand" alt="Keyman" src="/assets/keyman-logo.svg">
          Predictive Text Studio
        </h1>

        <p class="masthead__description">
          Add
          <strong>prediction</strong>
          and
          <strong>autocorrect</strong>
          to your language
        </p>
      </div>
      <img class="masthead__img" src="/assets/texting.svg" alt="" role="presentation">
    </div>
  </header>

  <section class="explanation" id="explanation">
    <!-- TODO: figure that explains the flow -->
    <a href="#get-started">
      <span class="button button--primary button--shadow button--large">Get started</span>
      <img src="assets/down-arrow.svg" alt="" role="presentation" class="block" />
    </a>
  </section>

  <section id="get-started" class="quick-start">
    <!-- TODO: should not use hard coded URL! -->
    <form action="/languages">
      <fieldset class="quick-start__step">
        <legend> Step 1: Select your language </legend>
        <BCP47Tag />
      </fieldset>

      <fieldset class="quick-start__step">
        <legend> Step 2: Attach a word list </legend>
        <Upload />
      </fieldset>

      <button class="button button--primary button--shadow quick-start__submit" type="submit"> Upload </button>
    </form>
  </section>
</main>

<footer class="footer">
  <p class="footer__copyright">
    <small>
      © 2020
      <a
        href="https://github.com/eddieantonio/predictive-text-studio/graphs/contributors">
        Eddie Antonio Santos and contributors</a>.</small>
  </p>
</footer>
