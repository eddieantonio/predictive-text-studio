<script lang="ts">
  import LanguageInfo from "../components/LanguageInfo.svelte";
  import LanguageSources from "../components/LanguageSources.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Button from "../components/Button.svelte";
  export let selectedButton: string = "information";

  // Mock language data object - this would be read from localstorage/db
  export let languageInformation = {
    get wordCount(): number {
      return languageInformation.sources.reduce(
        (sum, source) => sum + Number(source.size),
        0
      );
    },
    properties: {
      name: "Kwakwala",
      author: "Rae Anne",
      dictionary_name: "Kwakwala",
      copyright: "Rae Anne 2020",
      keyboard_image:
        "https://media.idownloadblog.com/wp-content/uploads/2017/02/iOS-10-Keyboard.jpg",
    },
    sources: [
      {
        name: "dictionary.xlsx",
        size: 78112,
        type: "excel",
      },
      {
        name: "Kinship Terms",
        size: 32,
        type: "direct entry",
      },
      {
        name: "secondary_dictionary.xlsx",
        size: 198,
        type: "excel",
      },
    ],
  };

  interface LanguageProject {
    id: number;
    name: string;
  }

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
   * Handles the click when the download language button is pressed. Should download a .kmp file.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleDownload = (): void => {};
</script>

<style>
  main {
    min-height: 100vh;
  }

  .languages {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    font-family: Cabin, sans-serif;
  }

  .languages__sidebar {
    min-width: 75px;
  }

  .languages__container {
    margin-left: 75px;
    display: flex;
    flex-direction: column;
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
    margin-top: 25px;
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
      <header class="languages__container--header">
        <div>
          <h1>Predictive Text Studio</h1>
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
        >Information</Button>
        <Button
          color="grey"
          isOutlined={(selectedButton === 'sources')}
          onClick={()=> handleClick('sources')}
          dataCy="languages-sources-btn"
        >Sources</Button>
        <Button
          color="blue"
          onClick={handleDownload}
          subtext={languageInformation.wordCount.toString() + " words"}
          dataCy="languages-download-btn"
        >Download</Button>
      </div>
      <div class="languages__container--content">
        {#if selectedButton === 'information'}
          <LanguageInfo properties={languageInformation.properties} />
        {:else if selectedButton === 'sources'}
          <LanguageSources sources={languageInformation.sources} />
        {/if}
      </div>
    </div>
  </div>
</main>
