<script lang="ts">
  import InputField from "./InputField.svelte";
  export let properties;
</script>

<style>
  .language__info {
    margin-top: 50px;
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

  img {
    width: auto;
    height: 200px;
  }
</style>

<div class="language__info">
  <div class="language__info-left">
    <InputField
      label="Language"
      id="language"
      value={properties.name}
      subtext="BCP49: kwk-latn" />
    <InputField
      label="Author or Organization"
      id="author"
      value={properties.author}
      subtext="Shortcode: raeanne" />
    <InputField
      label="Dictionary Name"
      id="dictionaryName"
      value={properties.dictionary_name}
      subtext="Model ID: raeanne.kwk.kwakwala" />
    <InputField label="Copyright" id="copyright" value={properties.copyright} />
  </div>
  <div class="language__info-right">
    <h3>Keyboard Preview</h3>
    <img src={properties.keyboard_image} alt="An iOS keyboard in english" />
  </div>
</div>
