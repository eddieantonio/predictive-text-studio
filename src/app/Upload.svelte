<script lang="ts">
  let onDraggedOver = false;
  let files = new Map<String, File>();

  const handleDrop = (event: DragEvent) => {
    onDraggedOver = false;

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

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

  const handleDragOver = (event: DragEvent) => {
    onDraggedOver = true;

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent) => {
    onDraggedOver = false;
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  };
</script>

<style>
  .upload-zone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 400px;
    background-color: rgb(97, 230, 186);
  }

  .inner-border {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 1em;
    height: calc(100% - 2em);
    width: calc(100% - 2em);
    background-color: rgb(34, 153, 113);
    border: 0.2em dashed rgb(17, 119, 85);
    color: white;
  }

  .drag-over {
    background-color: rgb(97, 230, 186);
    border: 0.3em dashed white;
  }
</style>

<div
  class="upload-zone"
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}>
  <div class='inner-border' class:drag-over={onDraggedOver}>
    <p>Drag file to upload ...</p>
  </div>
</div>
