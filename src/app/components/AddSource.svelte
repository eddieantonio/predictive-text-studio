<script lang="ts">
  import worker from "../spawn-worker";
  import Button from "./Button.svelte";
  import SplitButton from "./SplitButton.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  const UPLOAD_INPUT_ID = "upload-input";
  let manualEntry: boolean = false;
  let onDraggedOver = false;
  let fileList: File[] | FileList = [];

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

  const handleDrop = (event: DragEvent) => {
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

  const saveAddedSources = (): void => {
    for (let file of fileList) {
      worker.addDictionarySourceToProject(file.name, file);
    }
  };

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
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    min-width: 200px;
    border-radius: 5px;
    border: 3px dashed var(--gray-light);
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
    padding-bottom: 1rem;
    color: var(--blue);
  }

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
    color="blue"
    isOutlined
    size="large"
    onClick={saveAddedSources}
    dataCy="add-sources-save-btn">
    Save
  </Button>
</div>
