<script lang="ts">
  import InputField from "./InputField.svelte";
  import AutoComplete from "../components/AutoComplete.svelte";
  export let properties: any; // TODO: I am not sure what type to change it to from any
  import worker from "../spawn-worker";

  let tempObj: any = {};

  function onInputValue(event: CustomEvent) {
    tempObj[event.detail.key] = event.detail.value;
    worker.setProjectData(tempObj);
  }
</script>

<style>
  .language__info {
    display: flex;
    flex-direction: row;
  }

  .language__info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .language__info-right {
    margin-left: 300px;
    display: flex;
    flex-direction: column;
    order: 2;
  }

  .label {
    font-family: var(--main-font), sans-serif;
    font-weight: bold;
    font-size: var(--xs);
  }

  img {
    width: auto;
    height: 200px;
  }
</style>

<div class="language__info">
  <div class="language__info-left">
    <AutoComplete on:message={onInputValue} label="Language" subtext="" />
    <InputField
      on:message={onInputValue}
      label="Author or Organization"
      id="authorName"
      value=""
      subtext="Shortcode: raeanne" />
    <InputField
      on:message={onInputValue}
      label="Dictionary Name"
      id="dictionaryName"
      value={properties.dictionary_name}
      subtext="Model ID: raeanne.kwk.kwakwala" />
    <InputField
      on:message={onInputValue}
      label="Copyright"
      id="copyright"
      value=""
      subtext="" />
  </div>
  <div class="language__info-right">
    <p class="label">Keyboard Preview</p>
    <img src={properties.keyboard_image} alt="An iOS keyboard in english" />
  </div>
</div>
