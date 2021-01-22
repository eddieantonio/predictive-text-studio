<script lang="ts">
  import InputField from "./InputField.svelte";
  import AutoComplete from "../components/AutoComplete.svelte";
  import worker from "../spawn-worker";
  export let properties: any; // TODO: I am not sure what type to change it to from any

  function updateMetadata(event: CustomEvent) {
    let { key, value } = event.detail;
    worker.setProjectData({ [key]: value });
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
    <AutoComplete
      label="Language"
      subtext=""
      cyData="input-language-name"
      on:message={updateMetadata} />
    <InputField
      label="Author or Organization"
      subtext="Shortcode"
      id="authorName"
      cyData="input-author-name"
      on:message={updateMetadata} />
    <InputField
      label="Dictionary Name"
      subtext="Model ID"
      id="dictionaryName"
      cyData="input-dictionary-name" />
    <InputField
      on:message={updateMetadata}
      label="Copyright"
      id="copyright"
      cyData="input-copyright"
      subtext="" />
  </div>

  <div class="language__info-right">
    <p class="label">Keyboard Preview</p>
    <img src={properties.keyboard_image} alt="An iOS keyboard in english" />
  </div>
</div>
