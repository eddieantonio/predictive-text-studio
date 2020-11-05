<script lang="ts">
  import worker from "../spawn-worker";
  import Button from "./Button.svelte";
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  const UPLOAD_INPUT_ID = "upload-input";

  const leftText = "UPLOAD";
  const rightText = "DIRECT ENTRY";
  export let addSource: boolean = false;
  let manualEntry: boolean = false;
  let onDraggedOver = false;
  let fileList: any = [];

  function fileFromDataTransferItem(items: DataTransferItemList): File[] {
    const fileList: File[] = [];
    for (let item of items) {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file !== null) {
          fileList.push(file);
        }
      }
    }
    return fileList;
  }

  const handleDrop = async (event: DragEvent) => {
    onDraggedOver = false;

    if (event.dataTransfer == null) {
      return;
    } else if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      fileList = fileFromDataTransferItem(event.dataTransfer.items);
    } else {
      // Use DataTransfer interface to access the file(s)
      fileList = Array.from(event.dataTransfer.files);
    }
  };

  const handleDragOver = () => {
    onDraggedOver = true;
  };

  const handleDragLeave = () => {
    onDraggedOver = false;
  };

  const handleChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      fileList = input.files;
    }
  };

  const handleSave = (): void => {
    for (let file of fileList) {
      worker.addDictionarySourceToProject(file.name, file);
    }
  };

  const handleClose = () => {
    addSource = false;
    manualEntry = false;
  };

  const handleUpload = () => {
    addSource = true;
    manualEntry = false;
  };

  const handleDirectEntry = () => {
    manualEntry = true;
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

  .save-zone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }

  .arrow-button-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }
</style>

{#if addSource}
  <div class="arrow-button-zone" data-cy="add-source-window">
    <img src="assets/down-arrow.svg" alt="" role="presentation" class="block" />
    <SplitButton
      {leftText}
      {rightText}
      onClickLeft={handleUpload}
      onClickRight={handleDirectEntry} />
  </div>

  {#if manualEntry}
    <ManualEntry />
  {:else}
    <div
      class="upload-zone"
      class:drag-over={onDraggedOver}
      on:drop|preventDefault={handleDrop}
      on:dragover|preventDefault={handleDragOver}
      on:dragleave|preventDefault={handleDragLeave}
      data-cy="add-source-upload-zone">
      <img role="presentation" src="icons/upload-solid.svg" alt="" />
      <span>Drag and drop here</span>
      <span>or</span>
      <label for={UPLOAD_INPUT_ID} class="upload-btn">Browse file</label>
      <input
        id={UPLOAD_INPUT_ID}
        type="file"
        on:change={handleChange}
        data-cy="upload-spreadsheet" />
    </div>
  {/if}

  <div class="save-zone">
    <Button
      isOutlined
      size="large"
      onClick={handleClose}
      data-cy="close-add-source">
      CLOSE
    </Button>
    <Button
      color="blue"
      isOutlined
      size="large"
      onClick={handleSave}
      data-cy="save-source">
      SAVE
    </Button>
  </div>
{/if}
