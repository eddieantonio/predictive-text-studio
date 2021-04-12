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

  // The state that determines what columns are to be used on upload
  let wordColInd: number = 0;
  let countColInd: number = 1;

  // Split Button
  const uploadSourcesFromFile = () => {
    manualEntry = false;
  };

  const directEntrySources = () => {
    manualEntry = true;
  };

  const uploadFile = async (filesUploaded: File[]) => {
    if (filesUploaded.length === 0) return;

    // error = null;
    try {
      await addAllFilesToCurrentProject(project, filesUploaded, {
        wordColInd,
        countColInd,
      });
      // files = [...files, ...filesToSave];
      getLanguageSources();
    } catch (e) {
      // error = e;
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

{#if manualEntry}
  <ManualEntry
    {getLanguageSources}
    {tableData}
    closeTable={uploadSourcesFromFile} />
{:else}
  <Upload {uploadFile} />
{/if}
