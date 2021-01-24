<script lang="ts">
  import { onMount } from "svelte";

  import InputField from "./InputField.svelte";
  import LanguageNameInput from "../components/LanguageNameInput.svelte";
  import worker from "../spawn-worker";

  import type { KeyboardMetadata } from "@common/types";

  let languageInfo: KeyboardMetadata = {
    language: "",
    bcp47Tag: "",
  };
  let authorName: string = "";
  let copyright: string = "";

  onMount(async () => {
    const storedProjectData = await worker.fetchAllCurrentProjectMetadata();

    authorName = storedProjectData.authorName;
    languageInfo.bcp47Tag = storedProjectData.bcp47Tag;
    languageInfo.language = storedProjectData.langName;
    copyright = storedProjectData.copyright || "";
  });

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
    <LanguageNameInput
      label="Language"
      subtext=""
      cyData="input-language-name"
      bind:selectedLanguage={languageInfo}
      on:message={updateMetadata} />
    <InputField
      label="Author or Organization"
      subtext="Shortcode"
      id="authorName"
      cyData="input-author-name"
      bind:inputValue={authorName}
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
      bind:inputValue={copyright}
      cyData="input-copyright"
      subtext="" />
  </div>

  <div class="language__info-right">
    <p class="label">Keyboard Preview</p>
    <img src="assets/iOS-10-Keyboard.jpg" alt="An iOS keyboard in english" />
  </div>
</div>
