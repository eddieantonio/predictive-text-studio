<script lang="ts">
  import Upload from "../components/Upload.svelte";
  import BCP47Tag from "../components//BCP47Tag.svelte";
  export let name: string;

  let files: any;
</script>

<style>
</style>

<main role="application">
  <h1>Welcome to {name}!</h1>
  <Upload />
  <BCP47Tag />

  <p>Hi, my name is Xuechun!</p>
  <p>Hi my name is Eddie!</p>
  <p>Pranav</p>

  <input type="file" data-testid="input-file" bind:files />
</main>
