<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import type { WordListSource } from "@common/types";
  import LanguageInfo from "../components/LanguageInfo.svelte";
  import LanguageSources from "../components/LanguageSources.svelte";
  import Button from "../components/Button.svelte";
  import worker from "../spawn-worker";
  import { compileSuccess, currentDownloadURL } from "../stores";
  import { setupAutomaticCompilationAndDownloadURL } from "../logic/automatic-compilation";

  export let selectedButton: string = "information";

  let downloadReady: boolean = true;

  // Mock language data object - this would be read from localstorage/db
  interface DictionaryInformation {
    readonly wordCount: number;
    sources: WordListSource[];
  }

  export let languageInformation: DictionaryInformation = {
    get wordCount(): number {
      return languageInformation.sources.reduce(
        (sum, source: WordListSource) => sum + Number(source.size || 0),
        0
      );
    },
    sources: [],
  };

  async function getLanguageSources() {
    languageInformation.sources = await worker.getFilesFromStorage();
  }

  // listen to changes to the package compilation and enable download button accordingly
  $: downloadReady = $compileSuccess;

  onMount(() => {
    getLanguageSources();
    setupAutomaticCompilationAndDownloadURL();
  });

  /**
   * Handles the click when a content button (Information/Sources) is pressed
   * Changes the selected button variable
   *
   * @param {string} buttonName - Name of the button that was selected
   * @return {void}
   */
  const handleClick = (buttonName: string): void => {
    selectedButton = buttonName;
  };

  /**
   * Handles the click when the download language button is pressed. downloads a .kmp file.
   * @return {void}
   */
  const handleDownload = async () => {
    let { dictionaryName } = await worker.fetchAllCurrentProjectMetadata();

    if (!dictionaryName) dictionaryName = "Predictive-Text-Studio-Dictionary";

    const anchor = document.createElement("a");
    anchor.href = $currentDownloadURL;
    anchor.target = "_blank";
    anchor.download = `${dictionaryName}.kmp`;

    // Auto click on a element, trigger the file download
    anchor.click();

    anchor.remove();
  };
</script>

<style>
  :root {
    --laptop: 1024px;
    --margin: 4rem;
    --gap: 8rem;
  }
  main {
    max-width: var(--laptop);
    min-height: 100vh;
  }

  .languages {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    font-family: Cabin, sans-serif;
  }

  .languages__container {
    margin: auto var(--margin);
    width: calc(100vw - var(--gap));
  }

  .languages__container--header {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
  }

  .languages__container--header div {
    vertical-align: middle;
  }

  .languages__container--header h1 {
    font-family: Cabin, sans-serif;
    font-weight: bold;
    font-size: 30px;
  }

  .languages__container--header p {
    font-family: Cabin, sans-serif;
    font-size: var(--l);
  }

  .languages__container--header img {
    height: 1rem;
    width: auto;
    vertical-align: center;

    /* fallback font styles in case the image doesn't load */
    font-weight: bold;
    color: var(--black, #111);
  }

  .languages__container--actions {
    display: flex;
    flex-direction: row;
  }

  .languages__container--content {
    margin: 2rem auto;
  }

  @media (max-width: 768px) {
    .languages__container--actions {
      display: block;
    }
  }
  @media (max-width: 425px) {
    :root {
      --margin: 2rem;
      --gap: 4rem;
    }
  }
</style>

<!--
  TODO:
  1. Create/refactor button component
  2. Use variable names for colors and fonts
 -->
<main>
  <div class="languages">
    <div class="languages__container">
      <a href="/">
        <span class="button button--grey button--outline mt-xxl">
          {$_('page.lang.go_back_to_main_page')}
        </span>
      </a>
      <header class="languages__container--header">
        <div>
          <h1>{$_('common.name')}</h1>
          <p>designed for
            <img
            src="/assets/keyman-logo.svg"
            alt="Keyman" />
          </p>
        </div>
      </header>
      <div class="languages__container--actions">
        <Button
          color="grey"
          isOutlined={(selectedButton === 'information')}
          onClick={() => handleClick('information')}
          dataCy="languages-information-btn"
        >{$_('page.lang.information')}</Button>
        <Button
          color="grey"
          isOutlined={(selectedButton === 'sources')}
          onClick={()=> handleClick('sources')}
          dataCy="languages-sources-btn"
        >{$_('page.lang.sources')}</Button>
        <Button
          color="blue"
          onClick={handleDownload}
          subtext={languageInformation.wordCount.toString() + " words"}
          dataCy="languages-download-btn"
          enabled={downloadReady}
        >{$_('page.lang.download')}</Button>
      </div>
      <div class="languages__container--content">
        {#if selectedButton === 'information'}
          <LanguageInfo />
        {:else if selectedButton === 'sources'}
          <LanguageSources
            bind:sources={languageInformation.sources}
            getLanguageSources={getLanguageSources}
          />
        {/if}
      </div>
    </div>
  </div>
</main>
