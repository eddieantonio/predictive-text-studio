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
