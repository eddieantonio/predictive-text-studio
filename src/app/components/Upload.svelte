<script lang="ts">
  import DownloadKMP from './DownloadKMP.svelte';
  const UPLOAD_INPUT_ID = "upload-input";

  let onDraggedOver = false;
  let files = new Map<String, File>();
  let downloadURL = "";

  function setFile(file: File) {
    files.set(file.name, file);
    saveToIndexedDB(file.name, file);
  }

  const handleDrop = (event: DragEvent) => {
    onDraggedOver = false;
    const fileList:File[] = [];

    if (event.dataTransfer == null) {
      return;
    } else if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let item of event.dataTransfer.items) {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file !== null) {
            fileList.push(file);
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let file of event.dataTransfer.files) {
        fileList.push(file);
      }
    }
    for (let file of fileList) {
      setFile(file);
    }
  };

  const handleDragOver = () => {
    onDraggedOver = true;
  };

  const handleDragLeave = () => {
    onDraggedOver = false;
  };

  const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input !== null && input.files) {
      for (let file of input.files) {
        setFile(file);
      }
    }
  };

  const saveToIndexedDB = (name: string, file: File) => {
    const worker = new Worker("worker.js");
    worker.postMessage({ name, file });
    worker.onmessage = (event: MessageEvent) => {
      const kmpFile = event.data as ArrayBuffer;
      const blob = new Blob([kmpFile], {type: "application/octet-stream"})
      downloadURL = URL.createObjectURL(blob)

      worker.terminate();
    };
  };
</script>

<style>
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    width: 20%;
    min-width: 200px;
    border: 3px dashed var(--gray-light);
    border-radius: 5px;
  }

  .drag-over {
    border-color: var(--blue);
    background-color: var(--blue-light);
  }

  input {
    display: none;
  }

  span {
    font-weight: bold;
    color: var(--gray);
  }

  .upload-btn {
    margin: 0 auto;
    color: var(--blue);
    font-weight: bold;
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
  class:drag-over={onDraggedOver}
  on:drop|preventDefault={handleDrop}
  on:dragover|preventDefault={handleDragOver}
  on:dragleave|preventDefault={handleDragLeave}>
  <img role="presentation" src="icons/upload-solid.svg" alt="" />
  <span>Drag and drop here</span>
  <span>or</span>
  <label for={UPLOAD_INPUT_ID} class="upload-btn">Browse file</label>
  <input id={UPLOAD_INPUT_ID} type="file" on:change={handleChange} />
  <DownloadKMP {downloadURL}/>
</div>
