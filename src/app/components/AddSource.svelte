<script lang="ts">
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  import Upload from "./Upload.svelte";
  import type { WordList, WordListSource } from "@common/types";

  /**
   * Re-calculate word count
   */
  export let getLanguageSources: Function;

  // Split Button
  const uploadSourcesFromFile = () => {
    manualEntry = false;
  };

  const directEntrySources = () => {
    manualEntry = true;
  };

  let splitBtns = [
    {
      color: "blue",
      size: "medium",
      text: "Upload",
      isOutlined: false,
      hasDropShadow: false,
      dataCy: "add-sources-splitbtn-upload",
      handleClick: uploadSourcesFromFile,
      type: "submit",
    },
    {
      color: "grey",
      size: "medium",
      text: "Direct entry",
      isOutlined: false,
      hasDropShadow: false,
      dataCy: "add-sources-splitbtn-direct-entry",
      handleClick: directEntrySources,
      type: "submit",
    },
  ];
  // Manual Entry
  let manualEntry: boolean = false;
  let initialWordlist: WordList = [];
  let tableData: WordListSource = {
    name: "",
    wordlist: initialWordlist,
    size: 0,
    type: "direct-entry",
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
  <SplitButton {splitBtns} />
</div>

{#if manualEntry}
  <ManualEntry
    {getLanguageSources}
    {tableData}
    closeTable={uploadSourcesFromFile} />
{:else}
  <Upload {getLanguageSources} />
{/if}
