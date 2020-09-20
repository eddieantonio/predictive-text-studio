<script lang="ts">
  import Upload from "./Upload.svelte";
  export let name: string;

  let files: any;
</script>

<style>
  :global(:root) {
    --blue: #6fbbd4;
    --blue-light: #b3dbe7;
    --red: #b90529;
    --red-light: #de929c;
    --orange: #f18407;
    --orange-light: #fbc88f;
    --gray: #888888;
    --gray-light: #d6d6d6;
  }

  :global(:root) {
    font-family: "Carbin", sans-serif;
  }
</style>

<main role="application">
  <h1>Welcome to {name}!</h1>
  <Upload />

  <p>Hi, my name is Xuechun!</p>
  <p>Hi my name is Eddie!</p>
  <p>Pranav</p>
  <h2>Ian</h2>
  <input type="file" data-testid="input-file" bind:files />
</main>
