<script lang="ts">
  import bcp47Parser from "bcp-47";
  import worker from "../spawn-worker";

  const TAG_INPUT_ID = "tag-input";

  let bcp47Tag = "";
  let validTag = false;
  let displayEnterBCP47Tag = true;
  $: schema = bcp47Parser.parse(bcp47Tag);
  $: validTag = bcp47Tag.length > 0 && schema.language != null;
  $: displayEnterBCP47Tag = bcp47Tag == "" || validTag;
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
  class:error={displayEnterBCP47Tag}
  for={TAG_INPUT_ID}>{displayEnterBCP47Tag ? 'Invalid tag' : 'Enter BCP 47 tag'}</label>
