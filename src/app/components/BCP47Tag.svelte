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
  function onInputValue(event: CustomEvent) {
    console.log(event.detail.value)
  }
</script>

<InputField
  on:messageOnChange={onInputValue}
  id={TAG_INPUT_ID}
  size="large"
  cyData="tag-input"
  label="Step 1: Enter your languages"
  bind:value={tag}
  bind:error
  placeholder={'Enter the BCP 47 Tag'} />
