<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";

  import InputField from "./InputField.svelte";
  import LanguageNameInput from "../components/LanguageNameInput.svelte";
  import Button from "./Button.svelte";
  import worker from "../spawn-worker";

  import type { KeyboardMetadata, KmpJsonFileLanguage } from "@common/types";
  // import { KmpJsonFileLanguage } from "@common/types";

  let authorName: string = "";
  let copyright: string = "";
  let dictionaryName: string = "";
  let languages: KmpJsonFileLanguage[] = [];
  let languageInfo: KeyboardMetadata = {
    language: "",
    bcp47Tag: "",
  };

  export let id: number | undefined;

  // prevent triggering compilation twice
  let listenForLanguageInfoChanges: boolean = false;

  export async function getMetadata() {
    const storedProjectData = await worker.fetchAllCurrentProjectMetadata(id);
    listenForLanguageInfoChanges = false;
    authorName = storedProjectData.authorName;
    languageInfo.bcp47Tag = storedProjectData.bcp47Tag;
    languageInfo.language = storedProjectData.language;
    copyright = storedProjectData.copyright || "";
    dictionaryName = storedProjectData.dictionaryName || "";
    listenForLanguageInfoChanges = true;
  }

  // onMount(getMetadata);

  $: if (id) getMetadata();

  $: if (languageInfo && listenForLanguageInfoChanges) {
    worker.setProjectData({ languages }, id);
  }

  $: languages = [{ name: languageInfo.language, id: languageInfo.bcp47Tag }];
  $: copyrightButtonEnabled = copyright.charAt(0) !== "©";

  /**
   * Triggered by onBlur event from InputField
   */
  function onBlurListener(event: CustomEvent) {
    let { key, value } = event.detail;
    worker.setProjectData({ [key]: value }, id);
  }

  function addCopyrightSymbol() {
    if (copyright.charAt(0) !== "©") {
      copyright = "© " + copyright;
      worker.setProjectData({ copyright }, id);
    }
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
    margin-left: 18.75rem;
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

  .copyright-field {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1.5rem;
    margin-left: 2rem;
    min-width: 6.25rem;
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
    .copyright-field {
      margin-left: 0;
    }
  }
</style>

<div class="language__info">
  <div class="language__info-left">
    <LanguageNameInput
      label={$_('input.language')}
      cyData="input-language-name"
      bind:languageInfo />
    <InputField
      label={$_('input.author_or_organization')}
      subtext={$_('input.shortcode')}
      id="authorName"
      cyData="input-author-name"
      bind:inputValue={authorName}
      on:message={onBlurListener} />
    <InputField
      label={$_('input.dictionary_name')}
      subtext={$_('input.model_id')}
      id="dictionaryName"
      cyData="input-dictionary-name"
      bind:inputValue={dictionaryName}
      on:message={onBlurListener} />
    <InputField
      on:message={onBlurListener}
      label={$_('input.copyright')}
      id="copyright"
      bind:inputValue={copyright}
      cyData="input-copyright"
      subtext="" />
  </div>
  <div class="copyright-field">
    <Button
      size="small"
      enabled={copyrightButtonEnabled}
      color="blue"
      isOutlined={true}
      onClick={addCopyrightSymbol}>
      {$_('page.lang.add_copyright_symbol')}
    </Button>
  </div>
  <div class="language__info-right">
    <p class="label">{$_('input.keyboard_preview')}</p>
    <img
      src="assets/iOS-10-Keyboard.jpg"
      alt={$_('input.keyboard_preview_alt')} />
  </div>
</div>
