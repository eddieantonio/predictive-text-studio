<script lang="ts">
  import InputField from "./InputField.svelte";
  import {
    mapDecToColLetters,
    getColIndexFromString,
  } from "../logic/upload-advanced-settings";

  // props
  export let wordColumnInd: number;
  export let countColumnInd: number;

  const DEFAULT_WORD_INDEX = 0;
  const DEFAULT_COUNT_INDEX = 1;

  let wordColumnLetters: string = mapDecToColLetters(wordColumnInd);
  let countColumnLetters: string = mapDecToColLetters(countColumnInd);

  $: wordColumnInd = getColIndexFromString(
    wordColumnLetters,
    DEFAULT_WORD_INDEX
  );
  $: countColumnInd = getColIndexFromString(
    countColumnLetters,
    DEFAULT_COUNT_INDEX
  );
</script>

<style>
  #settings-disclaimer {
    font-size: var(--xs);
    color: var(--gray);
  }
</style>

<div class="mb-s">
  <details data-cy="upload-advance-settings">
    <summary>Advanced options</summary>
    <p id="settings-disclaimer">
      *Only works with .xlsx files and Google Sheets
    </p>
    <InputField
      label="Spreadsheet Word Column"
      id="wordColumnIndexInput"
      placeholder={mapDecToColLetters(wordColumnInd)}
      error={wordColumnLetters ? '' : `No custom word column specified! Defaulting to ${mapDecToColLetters(wordColumnInd)}`}
      bind:inputValue={wordColumnLetters}
      fullWidth={true} />
    <InputField
      label="Spreadsheet Count Column"
      id="countColumnIndexInput"
      placeholder={mapDecToColLetters(countColumnInd)}
      error={countColumnLetters ? '' : `No custom count column specified! Defaulting to ${mapDecToColLetters(countColumnInd)}`}
      bind:inputValue={countColumnLetters}
      fullWidth={true} />
  </details>
</div>
