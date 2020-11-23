<script lang="ts">
  import InputField from "./InputField.svelte";
  import * as bcp47 from "bcp-47";
  import worker from "../spawn-worker";

  const TAG_INPUT_ID = "tag-input";

  $: tag = "";
  $: schema = bcp47.parse(tag);
  $: validTag = tag === "" || (tag.length > 0 && schema.language !== null);
  $: error = validTag ? "" : "Invalid BCP 47 Tag";
  $: if (validTag) {
    worker.setProjectData({ languages: [{ name: "", id: tag }] });
  }
</script>

<InputField
  id={TAG_INPUT_ID}
  label="Step 1: Enter your languages"
  bind:value={tag}
  bind:error
  placeholder={'Enter the BCP 47 Tag'} />
