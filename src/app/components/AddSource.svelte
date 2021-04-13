<script lang="ts">
  import { _ } from "svelte-i18n";
  import ButtonBar from "./ButtonBar.svelte";
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  import Upload from "./Upload.svelte";
  import type { StoredWordList } from "@common/types";
  import { addAllFilesToCurrentProject } from "../logic/upload";

  /**
   * Re-calculate word count
   */
  export let getLanguageSources: Function;
  export let project: number;
  let error: Error | null = null;

  // Split Button
  const uploadSourcesFromFile = () => {
    manualEntry = false;
  };

  const directEntrySources = () => {
    manualEntry = true;
  };

  const saveFile = async (filesUploaded: File[]) => {
    if (filesUploaded.length === 0) return;
    error = null;
    try {
      await addAllFilesToCurrentProject(project, filesUploaded);
      getLanguageSources();
    } catch (e) {
      error = e;
    }
  };

  // Manual Entry
  let manualEntry: boolean = false;
  let tableData: StoredWordList = {
    name: "",
    wordlist: [],
    size: 0,
    type: "direct-entry",
    project,
  };
</script>

<style>
  .error {
    background-color: var(--error-bg-color);
    color: var(--error-fg-color);
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
  <ButtonBar>
    <SplitButton
      color={!manualEntry ? 'blue' : 'grey'}
      onClick={uploadSourcesFromFile}
      dataCy="add-sources-splitbtn-upload"
      size="medium">
      {$_('common.upload')}
    </SplitButton>
    <SplitButton
      color={manualEntry ? 'blue' : 'grey'}
      onClick={directEntrySources}
      dataCy="add-sources-splitbtn-direct-entry"
      size="medium">
      {$_('common.direct_entry')}
    </SplitButton>
  </ButtonBar>
</div>

{#if error}
  <p class:error>{error}</p>
{/if}
{#if manualEntry}
  <ManualEntry
    {getLanguageSources}
    {tableData}
    closeTable={uploadSourcesFromFile} />
{:else}
  <Upload {saveFile} />
{/if}
