<script lang="ts">
  import LanguageInfo from "../components/LanguageInfo.svelte";
  import LanguageSources from "../components/LanguageSources.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Button from "../components/Button.svelte";
  export let selectedButton: string = "information";
  export let selectedLanguage: string = "Kwakwala";

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

  export let languages: LanguageProject[] = [
    {
      id: 1,
      name: "Kwakwala",
    },
    {
      id: 2,
      name: "A",
    },
    {
      id: 3,
      name: "S",
    },
    {
      id: 4,
      name: "P",
    },
  ];

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

  /**
   * Handles the click when the email language button is pressed.
   * Should open the default mail application with the link to the .kmp file in the body.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleEmail = (): void => {};

  /**
   * Handles the click when the AirDrop language button is pressed. Should open AirDrop with a .kmp file.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleAirDrop = (): void => {};

  var isSharePopupOpen = false;

  const toggleSharePopup = (): void => {
    isSharePopupOpen = !isSharePopupOpen;
  };
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

  .share__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
  }

  .share__container-popup {
    width: 10rem;
    height: 100%;
    padding: 0.5rem 2rem;
    margin-left: -2rem;
    margin-top: 1rem;
    z-index: 2;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 5px;
  }

  .share__container-button {
    margin-top: 10px;
  }
</style>

<main>
  <div class="languages">
    <div class="languages__container">
      <header class="languages__container--header">
        <div>
          <h1>Predictive Text Studio</h1>
          <p>designed for <img src="/assets/keyman-logo.svg" alt="Keyman" /></p>
        </div>
      </header>
      <div class="languages__container--actions">
        <Button
          color="grey"
          isOutlined={selectedButton === 'information'}
          onClick={() => handleClick('information')}
          dataCy="languages-information-btn">
          Information
        </Button>
        <Button
          color="grey"
          isOutlined={selectedButton === 'sources'}
          onClick={() => handleClick('sources')}
          dataCy="languages-sources-btn">
          Sources
        </Button>
        <div class="share__container">
          <Button
            color="blue"
            onClick={toggleSharePopup}
            subtext={languageInformation.wordCount.toString() + ' words'}
            dataCy="languages-download-btn">
            Share
          </Button>
          {#if isSharePopupOpen}
            <div class="share__container-popup">
              <div class="share__container-button">
                <Button
                  color="blue"
                  onClick={handleDownload}
                  isFullWidth={true}
                  dataCy="languages-download-btn">
                  Download
                </Button>
              </div>
              <div class="share__container-button">
                <Button
                  color="blue"
                  onClick={handleDownload}
                  isFullWidth={true}
                  dataCy="languages-email-btn">
                  Email
                </Button>
              </div>
              <div class="share__container-button">
                <Button
                  color="blue"
                  onClick={handleDownload}
                  isFullWidth={true}
                  dataCy="languages-airdrop-btn">
                  Air Drop
                </Button>
              </div>
            </div>
          {/if}
        </div>
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
