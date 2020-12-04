<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import worker from "../spawn-worker";
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
  const dispatch = createEventDispatcher();

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
    dragEnterCounter = 0;
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

  const handleDragEnter = () => {
    dragEnterCounter++;
  };

  const handleDragLeave = () => {
    dragEnterCounter--;
  };

  const handleChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      dispatch("file", {
        status: true,
      });
      for (let file of input.files) {
        await worker.addDictionarySourceToProject(file.name, file);
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
</style>

<div
  class="upload-zone"
  class:drag-over={dragEnterCounter > 0}
  on:drop|preventDefault={handleDrop}
  on:dragenter|preventDefault={handleDragEnter}
  on:dragleave|preventDefault={handleDragLeave}
  data-cy="upload-dropzone">
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
