<script lang="ts">
  import Upload from "./Upload.svelte";
  export let name: string;

  let files: any;
</script>

<main role="application">
  <h1>Welcome to {name}!</h1>
  <Upload />

  <p>Hi, my name is Xuechun!</p>
  <p>Hi my name is Eddie!</p>
  <p>Pranav</p>
  <h2>Ian</h2>
  <input type="file" data-testid="input-file" bind:files />
</main>
