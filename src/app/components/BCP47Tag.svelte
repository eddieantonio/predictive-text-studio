<script lang="ts">
  import InputField from "./InputField.svelte";
  import * as bcp47 from "bcp-47";
  import worker from "../spawn-worker";

  let errorMessage: string = "";

  function onInputValue(event: CustomEvent) {
    const inputValue = event.detail.value;
    const schema = bcp47.parse(inputValue);
    if (inputValue.length > 0 && schema.language !== null) {
      errorMessage = "";
      worker.setProjectData({ languages: [{ name: "", id: inputValue }] });
    } else {
      errorMessage = "Invalid BCP 47 Tag";
    }
  }
</script>

<InputField
  on:messageOnChange={onInputValue}
  id="tag-input"
  size="large"
  cyData="tag-input"
  label="Step 1: Enter your languages"
  error={errorMessage}
  placeholder={'Enter the BCP 47 Tag'} />
