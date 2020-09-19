<script lang="ts">
  export let buttonProperties = {
    selectedButton: "information",
  };

  const handleClick = (buttonName: string): void => {
    buttonProperties.selectedButton = buttonName;
    console.log(buttonName + " button selected");
  };

  const handleDownload = (): void => {
    console.log("Download button clicked");
  };
</script>

<main>
  <div class="language-info__sidebar">
    <!-- <Projects {... projectList}> -->
  </div>

  <div class="language-info__container">
    <div class="language-info__container--header">
      <img src="../assets/keyman_logo.png" alt="Keyman Logo" />
      <h1>Predictive Text Studio</h1>
    </div>
    <div class="language-info__container--buttons">
      <button
        on:click={() => handleClick('information')}
        class="language-info__container--buttons-selected">
        Information
      </button>
      <button
        on:click={() => handleClick('sources')}
        class="language-info__container--buttons-deselected">
        Sources
      </button>
      <button
        on:click={handleDownload}
        class="language-info__container--buttons-download">
        Download
      </button>
    </div>
    <div class="language-info__container--content">
      {#if buttonProperties.selectedButton === 'information'}
        <!-- Information -->
      {:else if buttonProperties.selectedButton === 'sources'}
        <!-- Sources -->
      {/if}
    </div>
  </div>
</main>
