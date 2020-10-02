<script lang="ts">
  import LanguageInfo from "./Components/LanguageInfo.svelte";
  import LanguageSources from "./Components/LanguageSources.svelte";
  import Sidebar from "./Components/Sidebar.svelte";
  import Button from "./Components/Button.svelte";

  export let selectedButton: string = "information";
  export let selectedLanguage: string = "Kwakwala";

  // Mock language data object - this would be read from localstorage/db
  export let languageInformation = {
    word_count: "74231",
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
        size: "78112",
        type: "excel",
      },
      {
        name: "Kinship Terms",
        size: "32",
        type: "direct entry",
      },
      {
        name: "secondary_dictionary.xlsx",
        size: "198",
        type: "excel",
      },
    ],
  };

  export let languages: object[] = [
    {
      id: "1",
      name: "Kwakwala",
    },
    {
      id: "2",
      name: "A",
    },
    {
      id: "3",
      name: "S",
    },
    {
      id: "4",
      name: "P",
    },
  ];

  // In case we want word count to be dynamic
  // let languageWordCount: int = 0;
  // languageInformation.sources.map((source) => {
  //   languageWordCount += Number(source.size);
  // });

  /**
   * Handles the click when a content button (Information/Sources) is pressed
   * Changes the selected button variable
   *
   * @param {string} buttonName - Name of the button that was selected
   * @return {void}
   */
  const handleClick = (buttonName: string): void => {
    selectedButton = buttonName;
    console.log(buttonName + " button selected");
  };

  /**
   * Handles the click when the download language button is pressed. Should download a .kmp file.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleDownload = (): void => {
    console.log("Download button clicked");
  };
</script>

<style>
  main {
    height: 100vh;
    margin: -8px;
  }

  .languages {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    font-family: Cabin, sans-serif;
  }

  .languages__sidebar {
    width: 75px;
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

  .languages__container--header h1 {
    font-family: Cabin, sans-serif;
    font-weight: bold;
    font-size: 30px;
  }

  .languages__container--actions {
    display: flex;
    flex-direction: row;
  }

  .languages__container--content {
    margin-top: 25px;
  }

  img {
    width: 200px;
    height: auto;
  }
</style>

<!-- 
  TODO:
  1. Create/refactor button component
  2. Use variable names for colors and fonts
 -->
<main>
  <div class="languages">
    <div class="languages__sidebar">
      <Sidebar {languages} {selectedLanguage} />
    </div>

    <div class="languages__container">
      <div class="languages__container--header">
        <img
          src="https://keyman.com/cdn/deploy/img/logo2.ba10b4af03869e69115ce84380e980aa.png"
          alt="Keyman Logo" />
        <h1>Predictive Text Studio</h1>
      </div>
      <div class="languages__container--actions">
        <!-- <button
          on:click={() => handleClick('information')}
          class={selectedButton === 'information' ? 'selected' : 'deselected'}>
          Information
        </button> -->
        <Button
          color={"grey"}
          isOutlined={(selectedButton === 'information')}
          text="Information"
          callbackFunction={() => handleClick('information')}
        />
        <!-- <button
          on:click={() => handleClick('sources')}
          class={selectedButton === 'sources' ? 'selected' : 'deselected'}>
          Sources
        </button> -->
        <Button
          color="grey"
          isOutlined={(selectedButton === 'sources')}
          text="Sources"
          callbackFunction={()=> handleClick('sources')}
        />
        <!-- <button on:click={handleDownload} class="download"> Download </button> -->
        <Button
          color="blue"
          text="Download"
          callbackFunction={handleDownload}
          subtext={languageInformation.word_count += " words"}
        />
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
