<script lang="ts">
  import InputField from "./InputField.svelte";
  export let properties: any; // TODO: I am not sure what type to change it to from any
  export let languageDirection: string;
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
    <InputField
      {languageDirection}
      label="Language"
      id="language"
      value={properties.name}
      subtext="BCP49: kwk-latn" />
    <InputField
      {languageDirection}
      label="Author or Organization"
      id="author"
      value={properties.author}
      subtext="Shortcode: raeanne" />
    <InputField
      {languageDirection}
      label="Dictionary Name"
      id="dictionaryName"
      value={properties.dictionary_name}
      subtext="Model ID: raeanne.kwk.kwakwala" />
    <InputField
      {languageDirection}
      label="Copyright"
      id="copyright"
      value={properties.copyright}
      subtext="" />
  </div>
  <div class="language__info-right">
    <p class="label">Keyboard Preview</p>
    <img src={properties.keyboard_image} alt="An iOS keyboard in english" />
  </div>
</div>
