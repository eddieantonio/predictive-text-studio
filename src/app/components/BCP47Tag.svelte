<script lang="ts">
  import bcp47Parser from "bcp-47";
  import worker from "../spawn-worker";

  const TAG_INPUT_ID = "tag-input";

  let bcp47Tag = "";
  let validTag = false;
  $: schema = bcp47Parser.parse(bcp47Tag);
  $: validTag = bcp47Tag !== "" && schema.language === null;
  $: {
    if (validTag) {
      worker.updateBCP47Tag(bcp47Tag);
    }
  }
</script>

<style>
  .error {
    color: var(--red);
  }
</style>

<input id={TAG_INPUT_ID} bind:value={bcp47Tag} />
<label
  class:error={validTag}
  for={TAG_INPUT_ID}>{validTag ? 'Invalid tag' : 'Enter BCP 47 tag'}</label>
