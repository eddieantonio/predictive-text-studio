<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";

  import worker from "../spawn-worker";
  import type { KeyboardMetadata } from "@common/types";
import Bcp47Tag from "./BCP47Tag.svelte";

  /**************************** External props ******************************/

  /**
   * What text should appear above the input.
   */
  export let label = "";
  /**
   * Whether the label should be bold or not.
   */
  export let bold: boolean = true;

  /**
   * [data-cy] label (for Cypress tests)
   */
  export let cyData = "autocomplete-label";

  /**
   * The language selected by this element.
   */
  export let selectedLanguage: KeyboardMetadata | undefined = undefined;


  /************************** Internal variables ****************************/

  /**
   * List of languages that will be autocompleted.
   */
  let knownLanguages: KeyboardMetadata[] = [];

  onMount(async function loadLanguageListFromWorker() {
    knownLanguages = await worker.getDataFromStorage();
  });

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
    bind:selectedItem={selectedLanguage}
    labelFieldName="language" />
  <p class="autocomplete__subtext" data-cy="autocomplete-subtext">
    BCP47Tag:
    {selectedLanguage !== undefined ? selectedLanguage.bcp47Tag : ''}
  </p>
</div>
