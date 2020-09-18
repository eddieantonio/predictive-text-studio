<script lang="ts">
  import Upload from "./Upload.svelte";
  export let name: string;
</script>

<main role="application">
  <h1>Welcome to {name}!</h1>
  <Upload />
</main>
