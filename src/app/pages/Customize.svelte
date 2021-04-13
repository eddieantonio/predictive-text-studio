<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import type { StoredProjectData, StoredWordList } from "@common/types";
  import LanguageInfo from "../components/LanguageInfo.svelte";
  import LanguageSources from "../components/LanguageSources.svelte";
  import Button from "../components/Button.svelte";
  import worker from "../spawn-worker";
  import { compileSuccess, currentDownloadURL } from "../stores";
  import { setupAutomaticCompilationAndDownloadURL } from "../logic/automatic-compilation";
  import { PAGE_URLS } from "./page-urls";

  export let selectedButton: string = "information";

  interface LanguageInfoComponent extends LanguageInfo {
    getMetadata(): Promise<void>;
  }

  // reference to child component so it may be updated
  let languageInfo: undefined | LanguageInfoComponent;
  let downloadReady: boolean = true;
  let projects: StoredProjectData[] = [];
  let id: number | undefined;

  // Mock language data object - this would be read from localstorage/db
  interface DictionaryInformation {
    readonly wordCount: number;
    sources: StoredWordList[];
  }

  export let languageInformation: DictionaryInformation = {
    get wordCount(): number {
      return languageInformation.sources.reduce(
        (sum, source: StoredWordList) => sum + Number(source.size || 0),
        0
      );
    },
    sources: [],
  };

  async function getLanguageSources() {
    languageInformation.sources = await worker.getFilesFromStorage(id);
  }

  async function getProjectData() {
    projects = await worker.getProjectDataFromStorage();
  }

  // listen to changes to the package compilation and enable download button accordingly
  $: downloadReady = $compileSuccess;

  $: if (id) getLanguageSources();

  onMount(async () => {
    await getProjectData();
    id = projects[0]?.id;
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
   * Creates an anchor to download a file programmatically
   * @param href link to Blob or File
   * @param download Title of the download
   *
   */
  const createAnchor = (href: string, download: string): void => {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.download = download;
    // Auto click on a element, trigger the file download
    anchor.click();
    anchor.remove();
  };

  /**
   * Handles the click when the download language button is pressed. downloads a .kmp file.
   */
  const handleDownload = async (): Promise<void> => {
    let { dictionaryName } = await worker.fetchAllCurrentProjectMetadata();
    if (!dictionaryName) dictionaryName = "Predictive-Text-Studio-Dictionary";
    createAnchor($currentDownloadURL, `${dictionaryName}.kmp`);
  };

  /**
   * Handles downloading the files and metadata stored in IndexedDB
   */
  const handleExport = async (): Promise<void> => {
    const dataString = await worker.exportProjectData();
    const file = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(file);
    createAnchor(url, "Predictive-Text-Studio-Project.json");
  };

  /**
   * Programmatically triggering a file upload and importing project
   */
  const handleImport = (): void => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".json");

    input.addEventListener("change", async () => {
      const files = input.files;
      if (!files || files.length < 1) return;
      const fileString = await files[0].text();
      await worker.importProjectData(fileString);
      // load in the new metaData if languageInfo is in focus
      if (languageInfo) languageInfo.getMetadata();
      getLanguageSources();
      input.remove();
    });
    input.click();
  };

  const createProjectData = async (): Promise<void> => {
    await worker.createProjectData();
    projects = await worker.getProjectDataFromStorage();
  };

  const deleteProjectData = async () => {
    if (id) {
      await worker.deleteProjectData(id);
      projects = await worker.getProjectDataFromStorage();
      id = projects[0]?.id;
    }
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
  }

  .customize {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    font-family: Cabin, sans-serif;
  }

  .customize__sidebar {
    background-color: var(--gray-dark);
  }

  .customize__sidebar--project {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;

    background: var(--lite-gray);
    border-radius: 50%;
    font-size: 1rem;
    margin: 2rem 1rem;

    cursor: pointer;
  }

  .customize__sidebar--project:hover,
  .customize__sidebar--project.selected {
    background: var(--primary-blue);
    color: var(--white);
  }

  .customize__sidebar--project.add {
    font-size: 1.5rem;
    line-height: 1rem;
  }

  .customize__container {
    margin: auto var(--margin);
    width: calc(100vw - var(--gap));
  }

  .customize__container--header {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
  }

  .customize__container--footer {
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .customize__container--header div {
    vertical-align: middle;
  }

  .customize__container--header h1 {
    font-family: Cabin, sans-serif;
    font-weight: bold;
    font-size: 30px;
  }

  .customize__container--header p {
    font-family: Cabin, sans-serif;
    font-size: var(--l);
  }

  .customize__container--header img {
    height: 1rem;
    width: auto;
    vertical-align: center;

    /* fallback font styles in case the image doesn't load */
    font-weight: bold;
    color: var(--black, #111);
  }

  .customize__container--actions {
    display: flex;
    flex-direction: row;
  }

  .customize__container--content {
    margin: 2rem auto;
  }

  @media (max-width: 768px) {
    .customize__container--actions {
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
  <div class="customize">
    <div class="customize__sidebar">
      {#each projects as project}
        <div class="customize__sidebar--project" class:selected={project.id === id} on:click={() => id = project.id}>
          {(project.dictionaryName || "?").substring(0, 1)}
        </div>
      {/each}
      <div class="customize__sidebar--project add" on:click={createProjectData}>+</div>
    </div>
    <div class="customize__container">
      <a href={PAGE_URLS.home}>
        <span class="button button--grey button--outline mt-xxl">
          {$_('page.lang.go_back_to_main_page')}
        </span>
      </a>
      {#if id}
        <span class="button button--red mt-xxl" on:click={deleteProjectData}>
          {$_('page.lang.delete_project')}
        </span>
      {/if}
      <header class="customize__container--header">
        <div>
          <h1>{$_('common.app_name')}</h1>
          <p>{$_('page.main.designed_for')}
            <img
            src="/assets/keyman-logo.svg"
            alt="Keyman" />
          </p>
        </div>
      </header>
      {#if id}
        <div class="customize__container--actions">
          <Button
            color="grey"
            isOutlined={(selectedButton === 'information')}
            onClick={() => handleClick('information')}
            dataCy="customize-information-btn"
          >{$_('page.lang.information')}</Button>
          <Button
            color="grey"
            isOutlined={(selectedButton === 'sources')}
            onClick={()=> handleClick('sources')}
            dataCy="customize-sources-btn"
          >{$_('page.lang.sources')}</Button>
          <Button
            color="blue"
            onClick={handleDownload}
            subtext={languageInformation.wordCount.toString() + " words"}
            dataCy="customize-download-btn"
            enabled={downloadReady}
          >{$_('page.lang.download')}</Button>
        </div>
        <div class="customize__container--content">
          {#if selectedButton === 'information'}
            <LanguageInfo bind:this={languageInfo} {id} {getProjectData} />
          {:else if selectedButton === 'sources'}
            <LanguageSources
              project={id || 1}
              bind:sources={languageInformation.sources}
              {getLanguageSources}
            />
          {/if}
        </div>
      {:else}
        <div
          style="text-align: center; padding: 10px; background: var(--lite-white); margin-bottom: 100px;">
          <h3>{$_('page.lang.no_project')}</h3>
          <p>{$_('page.lang.no_project_subtitle')}</p>
        </div>
      {/if}
      <div class="customize__container--footer">
        <Button onClick={handleImport}>{$_('page.lang.import_project_data')}</Button>
        <Button onClick={handleExport}>{$_('page.lang.export_project_data')}</Button>
      </div>
    </div>
  </div>
</main>
