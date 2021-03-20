<script lang="ts">
  import InputField from "./InputField.svelte";
  import {
    mapDecToColLetters,
    getColIndexFromString,
  } from "../logic/upload-advanced-settings";

  // props
  export let wordColInd: number;
  export let countColInd: number;

  const DEFAULT_WORD_INDEX = 0;
  const DEFAULT_COUNT_INDEX = 1;

  let wordColLetters: string = mapDecToColLetters(wordColInd);
  let countColLetters: string = mapDecToColLetters(countColInd);

  $: wordColInd = getColIndexFromString(wordColLetters, DEFAULT_WORD_INDEX);
  $: countColInd = getColIndexFromString(countColLetters, DEFAULT_COUNT_INDEX);
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
      placeholder={mapDecToColLetters(wordColInd)}
      error={wordColLetters ? '' : `No custom word column specified! Defaulting to ${mapDecToColLetters(wordColInd)}`}
      bind:inputValue={wordColLetters}
      fullWidth={true} />
    <InputField
      label="Spreadsheet Count Column"
      id="countColumnIndexInput"
      placeholder={mapDecToColLetters(countColInd)}
      error={countColLetters ? '' : `No custom count column specified! Defaulting to ${mapDecToColLetters(countColInd)}`}
      bind:inputValue={countColLetters}
      fullWidth={true} />
  </details>
</div>
