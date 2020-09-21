<script lang="ts">
  const UPLOAD_INPUT_ID = "upload-input";

  let onDraggedOver = false;
  let files = new Map<String, File>();

  /**
   * TODO: this MUST be moved to a new file (bad coupling).
   */
  let generatedCode: string | null = null;

  const handleDrop = (event: DragEvent) => {
    onDraggedOver = false;

    if (event.dataTransfer == null) {
      return;
    } else if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let item of event.dataTransfer.items) {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file !== null) {
            files.set(file.name, file);
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let file of event.dataTransfer.files) {
        files.set(file.name, file);
      }
    }
    alert("File(s) dropped: " + files.size);
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
        files.set(file.name, file);
        alert(file.name);
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
</div>

<!--
  TODO: remove this once https://github.com/eddieantonio/predictive-text-studio/pull/58 is merged.
-->
{#if generatedCode}
  <pre><code>{generatedCode}</code></pre>
{/if}
