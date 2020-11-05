<script lang="ts">
  import worker from "../spawn-worker";
  import Button from "./Button.svelte";
  import SplitButton from "./SplitButton.svelte";
  const UPLOAD_INPUT_ID = "upload-input";

  export let addSource: boolean;
  let leftText = "UPLOAD";
  let rightText = "DIRECT ENTRY";
  let onDraggedOver = false;

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
    let fileList: File[] = [];

    if (event.dataTransfer == null) {
      return;
    } else if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      fileList = fileFromDataTransferItem(event.dataTransfer.items);
    } else {
      // Use DataTransfer interface to access the file(s)
      fileList = Array.from(event.dataTransfer.files);
    }
    for (let file of fileList) {
      await worker.addDictionarySourceToProject(file.name, file);
    }
  };

  const handleDragOver = () => {
    onDraggedOver = true;
  };

  const handleDragLeave = () => {
    onDraggedOver = false;
  };

  const handleChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      for (let file of input.files) {
        await worker.addDictionarySourceToProject(file.name, file);
      }
    }
  };

  const handleSave = () => {
    //TODO
  };

  const handleClose = () => {
    addSource = false;
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
  <div class="arrow-button-zone">
    <img
        src="assets/down-arrow.svg"
        alt=""
        role="presentation"
        class="block" />
    <SplitButton {leftText} {rightText} />
  </div>

  <div
    class="upload-zone"
    class:drag-over={onDraggedOver}
    on:drop|preventDefault={handleDrop}
    on:dragover|preventDefault={handleDragOver}
    on:dragleave|preventDefault={handleDragLeave}>
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

  <div class="save-zone">
    <Button isOutlined size="large" onClick={handleClose}>CLOSE</Button>
    <Button color="blue" isOutlined size="large" onClick={handleSave}>
      SAVE
    </Button>
  </div>
{/if}
