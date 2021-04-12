<script lang="ts">
  import { _ } from "svelte-i18n";
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
      // worker.setProjectData({ languages: [{ name: "", id: inputValue }] });
      dispatch("langauge", {
        status: true,
      });
    } else if (inputValue.length == 0) {
      errorMessage = "";
      dispatch("langauge", {
        status: false,
      });
    } else {
      errorMessage = $_("input.invalid_bcp47_tag");
      dispatch("langauge", {
        status: false,
      });
    }
  }
</script>

<InputField
  on:keytyped={onInputValue}
  id="tag-input"
  size="large"
  cyData="tag-input"
  label={$_('page.main.step_one')}
  error={errorMessage}
  placeholder={$_('input.enter_bcp47_tag')} />
