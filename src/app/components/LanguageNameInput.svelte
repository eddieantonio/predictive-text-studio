<script lang="ts">
  import { onMount } from "svelte";
  import worker from "../spawn-worker";
  import { createEventDispatcher } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";

  import type { KeyboardDataWithTime } from "@common/types";

  export let label = "";
  export let subtext = "";
  export let bold: boolean = true;
  export let cyData = "autocomplete-label";

  // To store selected language
  // TODO: rename to selectedLanguage
  export let selected: string = "";

  // To store Keyman Keyboard data
  let knownLanguages: KeyboardDataWithTime[] = [];

  const dispatch = createEventDispatcher();

  $: selectLanguage(selected.language, selected.bcp47Tag);

  onMount(async () => {
    knownLanguages = await worker.getDataFromStorage();
  });

  function selectLanguage(name, bcp47Tag) {
    subtext = bcp47Tag;

    // TODO: why... it it just key/value?
    dispatch("message", {
      key: "languages",
      value: [{ name, id: bcp47Tag }],
      status: true,
    });
  }
</script>

<style>
  .autocomplete {
    position: relative;
    width: fit-content;
  }
  .autocomplete__label {
    font-family: var(--main-font), sans-serif;
    font-size: var(--s);
    font-weight: normal;
  }
  /* Scoped-style means that this generic name only exists within THIS file: */
  .bold {
    font-weight: bold;
    font-size: var(--xs);
  }
  .autocomplete__input {
    font-family: var(--secondary-font), sans-serif;
    font-size: var(--m);
    padding: var(--sb-xs);
    border-radius: var(--sb-xs);
    border-width: 1px;
    border-color: var(--gray);
  }
  .autocomplete__suggestion-list {
    position: absolute;
    padding: 0 0 var(--sb-xs) 0;
    margin: 0;
    width: 100%;
    height: 11rem;
    overflow: scroll;
    background: white;
    box-shadow: 0px var(--sb-xs) var(--sb-m) rgba(0, 0, 0, 0.2);
    border-radius: 0 0 var(--sb-xs) var(--sb-xs);
    list-style-type: none;
    text-decoration: none;
    z-index: 5;
  }
  .autocomplete__suggestion-item {
    font-size: var(--m);
    font-style: bold;
    padding: var(--sb-xs) var(--sb-s);
    overflow: hidden;
    border-right: solid var(--sb-s) rgba(0, 0, 0, 0);
  }
  .autocomplete__suggestion-item--active {
    margin: 0;
    background-color: var(--gray-highlight);
  }
  .autocomplete__suggestion-item:hover {
    cursor: pointer;
    background-color: var(--gray-highlight);
  }
  .autocomplete__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }
</style>

<div class="autocomplete mb-m" data-cy={cyData}>
  {#if label !== ''}
    <p class="autocomplete__label" class:bold>{label}</p>
  {/if}
  <AutoComplete
    items={knownLanguages}
    bind:selectedItem={selected}
    labelFieldName="language" />
  <p class="autocomplete__subtext" data-cy="autocomplete-subtext">
    BCP47Tag:
    {subtext || ''}
  </p>
</div>
