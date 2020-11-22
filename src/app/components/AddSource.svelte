<script lang="ts">
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  import Upload from "./Upload.svelte";

  let manualEntry: boolean = false;
  let tableData = {
    name: "",
    data: [
      {
        word: "",
        count: undefined
      },
    ],
  };

  const uploadSourcesFromFile = () => {
    manualEntry = false;
  };

  const directEntrySources = () => {
    manualEntry = true;
  };
</script>

<style>
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
  <ManualEntry {tableData} />
{:else}
  <Upload />
{/if}
