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

  .languages__container--actions {
    display: flex;
    flex-direction: row;
  }

  button {
    padding: 10px 20px;
    margin: 0px 10px;
    border-radius: 10px;
    text-transform: uppercase;
    font-family: Cabin, sans-serif;
    font-size: 15px;
    font-weight: bold;
    transition-duration: 0.2s;
  }

  button:hover {
    cursor: pointer;
  }

  .selected {
    border: 1px solid #bdbdbd;
    background-color: #ffffff;
  }

  .selected:hover {
    background-color: #f1f1f1;
  }

  .deselected {
    border: none;
    background-color: #f1f1f1;
  }

  .deselected:hover {
    background-color: #c5c5c5;
  }

  .download {
    margin-left: 30px;
    border: none;
    background-color: #0099ff;
    color: #ffffff;
  }

  .download:hover {
    background-color: #006db6;
  }
</style>

<main>
  <div class="languages__sidebar">
    <!-- <Projects {... projectList}> -->
  </div>

  <div class="languages__container">
    <div class="languages__container--header">
      <img src="./assets/keyman_logo.png" alt="Keyman Logo" />
      <h1>Predictive Text Studio</h1>
    </div>
    <div class="languages__container--actions">
      <button
        on:click={() => handleClick('information')}
        class={selectedButton === 'information' ? 'selected' : 'deselected'}>
        Information
      </button>
      <button
        on:click={() => handleClick('sources')}
        class={selectedButton === 'sources' ? 'selected' : 'deselected'}>
        Sources
      </button>
      <button on:click={handleDownload} class="download"> Download </button>
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
