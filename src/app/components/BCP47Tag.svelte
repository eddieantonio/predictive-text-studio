<script lang="ts">
  import InputField from "./InputField.svelte";
  import * as bcp47 from "bcp-47";
  import worker from "../spawn-worker";
  import { createEventDispatcher } from "svelte";

  let errorMessage: string = "";
  const dispatch = createEventDispatcher();

  function onInputValue(event: CustomEvent) {
    const inputValue = event.detail.value;
    const schema = bcp47.parse(inputValue);
    if (inputValue.length > 0 && schema.language !== null) {
      errorMessage = "";
      worker.setProjectData({ languages: [{ name: "", id: inputValue }] });
      dispatch("langauge", {
        status: true
      });
    } else if (inputValue.length == 0) {
      errorMessage = "";
      dispatch("langauge", {
        status: false
      });
    } else {
      errorMessage = "Invalid BCP 47 Tag";
      dispatch("langauge", {
        status: false
      });
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
