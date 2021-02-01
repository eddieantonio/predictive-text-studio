<script lang="ts">
  import {
    addAllFilesToCurrentProject,
    getAllFilesFromDragEvent,
  } from "../logic/upload";
  const UPLOAD_INPUT_ID = "upload-input";

  // Dragging over nested element in a drag-and-drop zone
  // will fire a dragLeave event
  // Making implementing drag over effect problematic
  // Using a dragEnterCounter solves this issue
  // See https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
  // This problem can also be solved by listening for dragOver
  // However, as of right now, doing so on Chrome when dragging over nested element
  // will cause the drag over effect to be cancelled for a short amount of time, then resume
  let dragEnterCounter = 0;
  let error: Error | null = null;

  const handleDrop = async (event: DragEvent) => {
    dragEnterCounter = 0;

    let fileList = getAllFilesFromDragEvent(event);

    try {
      await addAllFilesToCurrentProject(fileList);
      error = null;
    } catch (e) {
      error = e;
    }
  };

  const handleDragEnter = () => {
    dragEnterCounter++;
  };

  const handleDragLeave = () => {
    dragEnterCounter--;
  };

  const handleDragOver = () => {
    dragEnterCounter = 1;
  };

  const handleChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      try {
        await addAllFilesToCurrentProject(input.files);
        error = null;
      } catch (e) {
        error = e;
      }
    }
  };
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
  .error {
    background-color: var(--error-bg-color);
    color: var(--error-fg-color);
  }
</style>

<div
  class="upload-zone"
  class:drag-over={dragEnterCounter > 0}
  on:drop|preventDefault={handleDrop}
  on:dragenter|preventDefault={handleDragEnter}
  on:dragleave|preventDefault={handleDragLeave}
  on:dragover|preventDefault={handleDragOver}
  data-cy="upload-dropzone">
  <img role="presentation" src="icons/upload-solid.svg" alt="" />
  {#if error}
    <p class:error>{error}</p>
  {/if}
  <span>Drag and drop an Excel .xlsx or TSV file here!</span>
  <span>or</span>
  <label for={UPLOAD_INPUT_ID} class="upload-btn">Browse file</label>
  <input
    id={UPLOAD_INPUT_ID}
    type="file"
    on:change={handleChange}
    data-cy="upload-spreadsheet" />
</div>
