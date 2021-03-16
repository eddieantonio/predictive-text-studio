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
</style>

<div class="mb-s">
  <details data-cy="upload-advance-settings">
    <summary>Advanced options</summary>
    <InputField
      label="Spreadsheet Word Column"
      id="wordColumnIndexInput"
      bind:inputValue={wordColumnLetters}
      fullWidth={true} />
    <InputField
      label="Spreadsheet Count Column"
      id="countColumnIndexInput"
      bind:inputValue={countColumnLetters}
      fullWidth={true} />
  </details>
</div>
