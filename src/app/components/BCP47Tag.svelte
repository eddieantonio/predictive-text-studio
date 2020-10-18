<script lang="ts">
  import bcp47Parser from "bcp-47";
  import worker from "../spawn-worker";

  const TAG_INPUT_ID = "tag-input";

  let bcp47Tag = "";
  let invalidTag = true;
  $: schema = bcp47Parser.parse(bcp47Tag);
  $: invalidTag = bcp47Tag !== "" && schema.language === null;
  $: {
  if (!invalidTag) {
    console.log("has valid tag in bcp47Tag", bcp47Tag);
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
  class:error={invalidTag}
  for={TAG_INPUT_ID}>{invalidTag ? 'Invalid tag' : 'Enter BCP 47 tag'}</label>
