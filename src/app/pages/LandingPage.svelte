<script lang="ts">
  import { _ } from "svelte-i18n";
  import Upload from "../components/Upload.svelte";
  import worker from "../spawn-worker";
  import GoogleSheetsInput from "../components/GoogleSheetsInput.svelte";
  import LanguageNameInput from "../components/LanguageNameInput.svelte";
  import DownloadKMP from "../components/DownloadKMP.svelte";
  import ButtonBar from "../components/ButtonBar.svelte";
  import SplitButton from "../components/SplitButton.svelte";
  import { currentDownloadURL } from "../stores";
  import type { KeyboardMetadata } from "@common/types";
  import type { RelevantKmpOptions } from "@common/kmp-json-file";
  import { onMount } from "svelte";
  import { PAGE_URLS } from "./page-urls";

  let selectedLanguage: KeyboardMetadata | undefined = undefined;
  let continueReady: boolean = false;
  let uploadFile: boolean = true;
  let isProjectInProgress: boolean = false;

  onMount(async () => {
    if (await worker.doesProjectExist()) {
      selectedLanguage = await worker.fetchAllCurrentProjectMetadata();
      isProjectInProgress = selectedLanguage !== undefined;
      // TODO: Boolean($currentDownloadURL) will always be false here
      // Ideally we want to see if $currentDownloadURL is available here when
      // determining if the project is complete
    }
  });

  $: continueReady =
    selectedLanguage !== undefined && Boolean($currentDownloadURL);

  $: if (Boolean($currentDownloadURL)) {
    if (selectedLanguage === undefined) {
      selectedLanguage = { language: "Undefined Language", bcp47Tag: "und" };
    }
  }

  $: if (selectedLanguage !== undefined) updateLanguage();

  function updateLanguage(): void {
    if (selectedLanguage !== undefined) {
      const options: Partial<Readonly<RelevantKmpOptions>> = {
        languages: [
          { name: selectedLanguage.language, id: selectedLanguage.bcp47Tag },
        ],
      };
      worker.setProjectData(options);
    }
  }

  // Split Button
  const uploadFromFile = () => {
    uploadFile = true;
  };

  const UploadFromGoogleSheets = () => {
    uploadFile = false;
  };
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
    --wave-height: 333px;
    --masthead-space-top: 1rem;
    --masthead-content-height: 20rem;
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
    margin: 0;
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
    padding: 20px;
  }

  .explanation__workflow__image {
    width: 16vw;
    min-width: 200px;
  }

  .card {
    border-radius: 0.5em;
    padding: 1.5rem;
  }

  .card__info {
    background-color: #e3f3ff;
  }

  .card__existing-project {
    margin-bottom: var(--s);
  }

  .quick-start {
    margin: 9rem auto;
    padding: 1.5rem;
    max-width: var(--quick-start-max-width);
  }

  .quick-start__step {
    margin: 0 0 2rem;
    border: 0;
    padding: 0;

    font-size: var(--s);
    line-height: 1.5;
  }

  .quick-start__submit-button {
    margin: 2rem 0;
    width: 100%;
  }

  .quick-start__submit-button--disabled {
    background: var(--gray-disabled);
    pointer-events: none;
  }
  .quick-start__submit-wrapper--disabled {
    cursor: not-allowed;
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
    width: 1.5rem;
  }

  legend {
    padding-bottom: 10px;
  }

  .split-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .inline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    .masthead__content {
      display: block;
      min-width: auto;
    }
    .masthead__image {
      position: absolute;
      width: 50vw;
      height: auto;
      right: 5vw;
    }
    .explanation__workflow {
      display: block;
    }
    .explanation__workflow__transform {
      margin: auto;
    }
  }

  @keyframes descend {
    0% {
      opacity: 20%;
      transform: translate3d(0, -100%, 0);
    }
  }
</style>

<svelte:head>
  <title>{$_('page.main.title')}</title>
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
          {$_('page.main.designed_for')}
          <img class="masthead__brand" alt="Keyman" src="/assets/keyman-logo.svg">
        </p>
        <p class="masthead__description">
          {$_('page.main.add')}
          <strong>{$_('page.main.prediction')}</strong>
          {$_('page.main.and')}
          <strong>{$_('page.main.autocorrect')}</strong>
          {$_('page.main.to_your_language')}
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
      <span
        class="button button--primary button--shadow button--large">{$_('page.main.get_started')}</span>
      <img
        src="assets/down-arrow.svg"
        alt=""
        role="presentation"
        class="block" />
    </a>
  </section>

  <section id="get-started" class="quick-start">
    {#if isProjectInProgress && continueReady}
      <div
        id="project-exists-info"
        class="card card__info card__existing-project"
        data-cy="existing-project-card">
        <form action={PAGE_URLS.customize}>
          <h3>{$_('input.existing_project_warning')}</h3>
          <p>{$_('input.existing_project_continue_prompt')}</p>
          <button
            class="button button--primary quick-start__submit-button"
            class:quick-start__submit-button--disabled={!continueReady}
            type="submit"
            data-cy="existing-project-continue-button">
            {$_('input.continue')}
          </button>
        </form>
      </div>
    {/if}
    <form action={PAGE_URLS.customize} data-cy="quick-start">
      <fieldset class="quick-start__step">
        <LanguageNameInput
          bind:selectedLanguage
          label={$_('page.main.step_one')}
          bold={false} />
      </fieldset>

      <fieldset class="quick-start__step">
        <div class="inline">
          <legend>{$_('page.main.step_two')}</legend>
          <a href="help" target="_blank">{$_('common.help')}</a>
        </div>
      </fieldset>

      <div class="split-container">
        <ButtonBar>
          <SplitButton
            color="blue"
            dataCy="landing-splitbtn-upload"
            onClick={uploadFromFile}
            type="button">
            {$_('page.main.upload_tab_label')}
          </SplitButton>
          <SplitButton
            dataCy="landing-splitbtn-google-sheets"
            onClick={UploadFromGoogleSheets}
            type="button">
            {$_('page.main.google_sheets_tab_label')}
          </SplitButton>
        </ButtonBar>
      </div>
      {#if uploadFile}
        <Upload />
      {:else}
        <GoogleSheetsInput />
      {/if}
      <div
        class="quick-start__submit-wrapper"
        class:quick-start__submit-wrapper--disabled={!continueReady}>
        <DownloadKMP downloadURL={$currentDownloadURL} />
        <p>{$_('common.or')}</p>
        <button
          class="button button--primary button--shadow quick-start__submit-button"
          class:quick-start__submit-button--disabled={!continueReady}
          type="submit"
          data-cy="landing-page-continue-button">
          {$_('page.main.customize')}
        </button>
      </div>
    </form>
  </section>
</main>

<footer class="footer">
  <p class="footer__copyright">
    <small>
      <a href={PAGE_URLS.privacy}>{$_('page.main.privacy_policy')}</a>
      <br />
      <a
        href={PAGE_URLS.team}
        data-cy="team-page-link">{$_('page.main.about_the_team')}</a>
      <br />
      © 2020–{new Date().getFullYear()}
      <a
        href="https://nrc.canada.ca/en/research-development/research-collaboration/programs/canadian-indigenous-languages-technology-project">
        National Research Council Canada</a>.
    </small>
  </p>
</footer>
