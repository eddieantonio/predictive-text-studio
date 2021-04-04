<script lang="ts">
  import { _ } from "svelte-i18n";
  import ButtonBar from "./ButtonBar.svelte";
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
  <ButtonBar>
    <SplitButton
      color="blue"
      onClick={uploadSourcesFromFile}
      dataCy="add-sources-splitbtn-upload"
      size="medium">
      {$_('common.upload')}
    </SplitButton>
    <SplitButton
      onClick={directEntrySources}
      dataCy="add-sources-splitbtn-direct-entry"
      size="medium">
      {$_('common.direct_entry')}
    </SplitButton>
  </ButtonBar>
</div>

{#if manualEntry}
  <ManualEntry
    {getLanguageSources}
    {tableData}
    closeTable={uploadSourcesFromFile} />
{:else}
  <Upload {getLanguageSources} />
{/if}
