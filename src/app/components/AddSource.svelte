<script lang="ts">
  import Button from "./Button.svelte";
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  import Upload from "./Upload.svelte";
  let manualEntry: boolean = false;

  const saveAddedSources = (): void => {};

  const closeAddSourceZone = () => {
    manualEntry = false;
  };

  const uploadSourcesFromFile = () => {
    manualEntry = false;
  };

  const directEntrySources = () => {
    manualEntry = true;
  };
</script>

<style>
  .save-zone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }

  .top-button-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }
</style>

<div class="top-button-zone" data-cy="add-source-options">
  <SplitButton
    leftText="Upload"
    rightText="Direct entry"
    dataCyLeft="add-sources-splitbtn-left"
    dataCyRight="add-sources-splitbtn-right"
    onClickLeft={uploadSourcesFromFile}
    onClickRight={directEntrySources} />
</div>

{#if manualEntry}
  <ManualEntry />
{:else}
  <Upload />
{/if}

<div class="save-zone">
  <Button
    color="blue"
    isOutlined
    size="large"
    onClick={saveAddedSources}
    dataCy="add-sources-save-btn">
    Save
  </Button>
</div>
