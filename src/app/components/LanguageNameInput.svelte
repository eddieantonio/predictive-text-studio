<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";

  import worker from "../spawn-worker";
  import type { KeyboardMetadata } from "@common/types";

  export let label = "";
  export let subtext = "";
  export let bold: boolean = true;
  export let cyData = "autocomplete-label";

  // To store selected language
  // TODO: rename to selectedLanguage
  export let selected: KeyboardMetadata | undefined = undefined;

  // To store Keyman Keyboard data
  let knownLanguages: KeyboardMetadata[] = [];

  const dispatch = createEventDispatcher();

  $: if (selected) selectLanguage(selected);

  onMount(async () => {
    knownLanguages = await worker.getDataFromStorage();
  });

  function selectLanguage({ language, bcp47Tag }: KeyboardMetadata) {
    subtext = bcp47Tag;

    // TODO: why... it it just key/value?
    dispatch("message", {
      key: "languages",
      value: [{ language, id: bcp47Tag }],
      status: true,
    });
  }
</script>

<style>
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
  .autocomplete__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }

  /**
   * Customize appearance of the internal autocomplete.
   * See: https://github.com/pstanoev/simple-svelte-autocomplete/tree/6daf489771c908a497a660f4de44876cd98d7759#style-and-ui-options
   */
  :global(.autocomplete--full-width) {
    /* the internal declaration is WAY more specific than this declaration, so
     * use !important ¯\_(ツ)_/¯  */
    display: block !important;
  }
</style>

<div data-cy={cyData}>
  {#if label !== ''}
    <p class="autocomplete__label" class:bold>{label}</p>
  {/if}
  <AutoComplete
    items={knownLanguages}
    className="autocomplete--full-width"
    bind:selectedItem={selected}
    labelFieldName="language" />
  <p class="autocomplete__subtext" data-cy="autocomplete-subtext">
    BCP47Tag:
    {subtext || ''}
  </p>
</div>
