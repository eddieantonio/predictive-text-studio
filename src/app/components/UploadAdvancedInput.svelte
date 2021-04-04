<script lang="ts">
  import { _ } from "svelte-i18n";
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
    <summary>{$_('input.advanced_options')}</summary>
    <p id="settings-disclaimer">{$_('input.only_works_with')}</p>
    <InputField
      label={$_('input.spreadsheet_word_column')}
      id="wordColumnIndexInput"
      placeholder={mapDecToColLetters(wordColInd)}
      error={wordColLetters ? '' : `${$_('input.no_custom_word_column')} ${mapDecToColLetters(wordColInd)}`}
      bind:inputValue={wordColLetters}
      fullWidth={true} />
    <InputField
      label={$_('input.spreadsheet_count_column')}
      id="countColumnIndexInput"
      placeholder={mapDecToColLetters(countColInd)}
      error={countColLetters ? '' : `${$_('input.no_custom_count_column')} ${mapDecToColLetters(countColInd)}`}
      bind:inputValue={countColLetters}
      fullWidth={true} />
  </details>
</div>
