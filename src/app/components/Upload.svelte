<script lang="ts">
  import {
    addAllFilesToCurrentProject,
    filesFromDragEvent,
    filesFromInputElement,
  } from "../logic/upload";
  import UploadAdvancedInput from "./UploadAdvancedInput.svelte";
  const UPLOAD_INPUT_ID = "upload-input";

  // Dragging over nested element in a drag-and-drop zone
  // will fire a dragLeave event
  // Making implementing drag over effect problematic
  // Using a dragEnterCounter solves this issue
  // See https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
  // This problem can also be solved by listening for dragOver
  // However, as of right now, doing so on Chrome when dragging over nested element
  // will cause the drag over effect to be cancelled for a short amount of time, then resume
  let files: File[] = [];
  let dragEnterCounter = 0;
  let error: Error | null = null;

  // The state that determines what columns are to be used on upload
  let wordColumnInd: number = 0;
  let countColumnInd: number = 1;

  /**
   * Re-calculate word count
   */
  export let getLanguageSources: Function = () => {};

  async function uploadFilesFromDragAndDrop(event: DragEvent) {
    dragEnterCounter = 0;
    const filesDropped = filesFromDragEvent(event);
    await uploadAllFilesOrDisplayError(filesDropped);
  }

  async function uploadFilesFromInputElement(event: Event) {
    const filesUploaded = filesFromInputElement(event.target);
    await uploadAllFilesOrDisplayError(filesUploaded);
  }

  async function uploadAllFilesOrDisplayError(
    filesToSave: File[]
  ): Promise<void> {
    if (filesToSave.length === 0) return;

    error = null;
    try {
      await addAllFilesToCurrentProject(filesToSave, {
        wordColInd: wordColumnInd,
        countColInd: countColumnInd,
      });
      files = [...files, ...filesToSave];
      getLanguageSources();
    } catch (e) {
      error = e;
    }
  }
</script>

<style>
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    min-width: 200px;
    border: 3px dashed var(--gray-light);
    border-radius: 5px;
    line-height: 1.2;
  }

  .drag-over {
    border-color: var(--blue);
    background-color: var(--blue-light);
  }

  input {
    display: none;
  }

  .upload-btn {
    margin: 0 auto;
    color: var(--primary-blue);
  }

  .upload-btn:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  img {
    width: 2em;
    color: var(--blue);
    padding-bottom: 1em;
  }
  .info {
    display: flex;
    margin-bottom: 0.5em;
  }
  .icon {
    padding: 0 0.25em;
    width: 1em;
    height: 1.2em;
  }
  .error {
    background-color: var(--error-bg-color);
    color: var(--error-fg-color);
  }
</style>

<UploadAdvancedInput bind:wordColumnInd bind:countColumnInd />
<div
  class="upload-zone"
  class:drag-over={dragEnterCounter > 0}
  data-cy="upload-dropzone"
  on:drop|preventDefault={uploadFilesFromDragAndDrop}
  on:dragenter|preventDefault={() => void dragEnterCounter++}
  on:dragleave={() => void dragEnterCounter--}
  on:dragover|preventDefault={() => void (dragEnterCounter = 1)}>
  <img role="presentation" src="icons/upload-solid.svg" alt="" />
  {#if error}
    <p class:error>{error}</p>
  {/if}
  {#each files as file}
    <div class="info">
      {file.name}
      <img
        class="icon"
        src="icons/checked.svg"
        alt="file uploaded successfully" />
    </div>
  {/each}
  <span>Drag and drop an Excel .xlsx or TSV file here!</span>
  <span>or</span>
  <label for={UPLOAD_INPUT_ID} class="upload-btn">Browse file</label>
  <input
    id={UPLOAD_INPUT_ID}
    type="file"
    on:change={uploadFilesFromInputElement}
    data-cy="upload-spreadsheet" />
</div>
