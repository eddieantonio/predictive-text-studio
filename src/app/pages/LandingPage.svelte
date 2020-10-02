<script lang="ts">
  import Upload from "../components/Upload.svelte";
  import BCP47Tag from "../components//BCP47Tag.svelte";
  export let name: string;

  let files: any;
</script>

<style>
  :global(:root) {
    /* Keyman brand colours, derived from https://keyman.com/ */
    --blue: #6fbbd4;
    --blue-light: #b3dbe7;
    --red: #b90529;
    --red-light: #de929c;
    --orange: #f18407;
    --orange-light: #fbc88f;
    --gray: #888888;
    --gray-light: #d6d6d6;

    /* Font stack */
    /* Custom fonts downloaded from Google Fonts -- see public/index.html */
    --main-font: "Cabin";
    --mono-font: "Roboto Mono";
  }

  :global(body) {
    font-family: var(--main-font), sans-serif;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: var(--main-font), sans-serif;
  }

  :global(pre, code, samp) {
    font-family: var(--mono-font), monospace;
  }
</style>

<main role="application">
  <h1>Welcome to {name}!</h1>
  <Upload />
  <BCP47Tag />

  <p>Hi, my name is Xuechun!</p>
  <p>Hi my name is Eddie!</p>
  <p>Pranav</p>

  <input type="file" data-testid="input-file" bind:files />
  <h1>bye</h1>
</main>
