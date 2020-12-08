<script lang="ts">
  import Upload from "../components/Upload.svelte";
  import GoogleSheetsInput from "../components/GoogleSheetsInput.svelte";
  import BCP47Tag from "../components/BCP47Tag.svelte";
  import DownloadKMP from "../components/DownloadKMP.svelte";
  import worker from "../spawn-worker";
  import * as Comlink from "comlink";
  let downloadURL = "";

  worker.onPackageCompileSuccess(
    Comlink.proxy(async () => {
      const kmp = await worker.getKMPPackage();
      downloadURL = createURL(kmp);
    })
  );

  function createURL(kmpFile: ArrayBuffer): string {
    const blob = new Blob([kmpFile], { type: "application/octet-stream" });
    return URL.createObjectURL(blob);
  }
</script>

<style>
  :global(body) {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100vh;
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
    --wave-height: 222px;
    --masthead-space-top: 1rem;
    --masthead-content-height: 13rem;
    --masthead-solid-color-height: calc(
      var(--masthead-space-top) + var(--masthead-content-height)
    );
    --masthead-background-color: #09f;

    width: 100vw;
    max-width: 100%;
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
    min-width: 37.5rem;
    margin: auto;

    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
  }

  .masthead__brand {
    vertical-align: middle;
    height: 1rem;

    /* fallback font styles in case the image doesn't load */
    font-weight: bold;
    color: var(--black, #111);
  }

  .masthead__title {
    font-size: var(--xxl);
    font-weight: 700;
  }

  .masthead__branding {
    display: inline;
    vertical-align: middle;
    font-size: var(--s);
  }

  .masthead__description {
    font-size: var(--l);
  }

  .masthead__image {
    /* giving an explict width and height allows the layout engine to allocate
     * the right amount of space while the image loads */
    width: 23.5625rem;
    height: 18.5rem;

    animation: descend 1s;
  }

  .explanation {
    margin: 2rem;

    text-align: center;
  }

  .explanation__workflow {
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    font-weight: bold;
  }

  .explanation__workflow__transform {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10vw;
    min-width: 180px;
  }

  .explanation__workflow__transform__arrow {
    padding-top: 20px;
  }

  .explanation__workflow__image {
    width: 16vw;
    min-width: 200px;
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

    font-size: var(--xl);
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

  legend {
    padding-bottom: 10px;
  }

  @keyframes descend {
    0% {
      opacity: 20%;
      transform: translate3d(0, -100%, 0);
    }
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
          Predictive Text Studio
        </h1>
        <p class="masthead__branding">
          designed for 
          <img class="masthead__brand" alt="Keyman" src="/assets/keyman-logo.svg">
        </p>
        <p class="masthead__description">
          Add
          <strong>prediction</strong>
          and
          <strong>autocorrect</strong>
          to your language
        </p>
      </div>
      <img class="masthead__image" src="/assets/texting.svg" alt="" role="presentation">
    </div>
  </header>

  <section class="explanation" id="explanation">
    <figure class="explanation__workflow">
      <img
        src="assets/workflow-spreadsheet.svg"
        alt="a spreadsheet of words in your language"
        class="explanation__workflow__image" />

      <div class="explanation__workflow__transform">
        Predictive Text Studio
        <img
          class="explanation__workflow__transform__arrow"
          src="assets/workflow-arrow.svg"
          alt=""
          role="presentation" />
      </div>

      <img
        src="assets/workflow-keyboard.svg"
        alt="your words appear in the predictive text banner on your phone's keyboard"
        class="explanation__workflow__image" />
    </figure>
    <a href="#get-started">
      <span class="button button--primary button--shadow button--large">Get
        started</span>
      <img
        src="assets/down-arrow.svg"
        alt=""
        role="presentation"
        class="block" />
    </a>
  </section>

  <section id="get-started" class="quick-start">
    <!-- TODO: should not use hard coded URL! -->
    <form action="/languages" data-cy="quick-start">
      <fieldset class="quick-start__step">
        <BCP47Tag />
      </fieldset>

      <fieldset class="quick-start__step">
        <legend> Step 2: Attach a word list </legend>
        <Upload />
        <DownloadKMP {downloadURL} />
      </fieldset>

      <button class="button button--primary button--shadow quick-start__submit" type="submit"> Upload </button>
      <fieldset class="quick-start__step">
        <legend>Or Get Values from a Google Sheet</legend>
      </fieldset>
    </form>
    <GoogleSheetsInput />
  </section>
</main>

<footer class="footer">
  <p class="footer__copyright">
    <small>
      <a href="/privacy">Privacy Policy</a>
      <br />
      © 2020
      <a
        href="https://github.com/eddieantonio/predictive-text-studio/graphs/contributors">
        Eddie Antonio Santos and contributors</a>.</small>
  </p>
</footer>
