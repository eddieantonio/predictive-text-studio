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
  let dictionaryName: string = "";

  // prevent triggering compilation twice
  let listenForLanguageInfoChanges: boolean = false;

  export async function getMetadata() {
    const storedProjectData = await worker.fetchAllCurrentProjectMetadata();

    listenForLanguageInfoChanges = false;

    authorName = storedProjectData.authorName;
    languageInfo.bcp47Tag = storedProjectData.bcp47Tag;
    languageInfo.language = storedProjectData.langName;
    copyright = storedProjectData.copyright || "";
    dictionaryName = storedProjectData.dictionaryName || "";

    listenForLanguageInfoChanges = true;
  }

  onMount(getMetadata);

  $: if (languageInfo && listenForLanguageInfoChanges) {
    updateMetadata("languages", [
      { name: languageInfo.language, id: languageInfo.bcp47Tag },
    ]);
  }

  function updateMetadata(key: any, value: any) {
    worker.setProjectData({ [key]: value });
  }

  /**
   * Triggered by onBlur event from InputField
   */
  function onBlurListener(event: CustomEvent) {
    let { key, value } = event.detail;
    updateMetadata(key, value);
  }
</script>

<style>
  .language__info {
    display: flex;
    justify-content: space-between;
  }

  .language__info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .language__info-right {
    margin-left: 300px;
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

  @media (max-width: 768px) {
    .language__info {
      display: block;
    }
    .language__info-right {
      margin: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
</style>

<div class="language__info">
  <div class="language__info-left">
    <LanguageNameInput
      label="Language"
      cyData="input-language-name"
      bind:selectedLanguage={languageInfo} />
    <InputField
      label="Author or Organization"
      subtext="Shortcode"
      id="authorName"
      cyData="input-author-name"
      bind:inputValue={authorName}
      on:message={onBlurListener} />
    <InputField
      label="Dictionary Name"
      subtext="Model ID"
      id="dictionaryName"
      cyData="input-dictionary-name"
      bind:inputValue={dictionaryName}
      on:message={onBlurListener} />
    <InputField
      on:message={onBlurListener}
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
