<script lang="ts">
  import LanguageInfo from "./LanguageInfo.svelte";
  import LanguageSources from "./LanguageSources.svelte";

  export let selectedButton: string = "information";

  const handleClick = (buttonName: string): void => {
    selectedButton = buttonName;
    console.log(buttonName + " button selected");
  };

  const handleDownload = (): void => {
    console.log("Download button clicked");
  };
</script>

<style>
  .languages__sidebar {
    width: 10%;
  }

  .languages__container {
    width: 90%;
    display: flex;
    flex-direction: column;
  }

  .languages__container--header {
    display: flex;
    flex-direction: column;
  }

  .languages__container--header h1 {
    font-family: Cabin, sans-serif;
    font-weight: bold;
    font-size: 30px;
  }

  .languages__container--buttons {
    display: flex;
    flex-direction: row;
    font-family: Cabin, sans-serif;
    font-size: 15px;
    font-weight: bold;
  }

  .languages__container--buttons-selected {
    border: 1px solid #bdbdbd;
    background-color: #ffffff;
  }

  .languages__container--buttons-selected {
    background-color: #f1f1f1;
  }

  .languages__container--buttons-download {
    margin-left: 30px;
    background-color: #0099ff;
    color: #ffffff;
  }
</style>

<main>
  <div class="languages__sidebar">
    <!-- <Projects {... projectList}> -->
  </div>

  <div class="languages__container">
    <div class="languages__container--header">
      <img src="../assets/keyman_logo.png" alt="Keyman Logo" />
      <h1>Predictive Text Studio</h1>
    </div>
    <div class="languages__container--buttons">
      <button
        on:click={() => handleClick('information')}
        class="languages__container--buttons-selected">
        Information
      </button>
      <button
        on:click={() => handleClick('sources')}
        class="languages__container--buttons-deselected">
        Sources
      </button>
      <button
        on:click={handleDownload}
        class="languages__container--buttons-download">
        Download
      </button>
    </div>
    <div class="languages__container--content">
      {#if selectedButton === 'information'}
        <LanguageInfo />
      {:else if selectedButton === 'sources'}
        <LanguageSources />
      {/if}
    </div>
  </div>
</main>
