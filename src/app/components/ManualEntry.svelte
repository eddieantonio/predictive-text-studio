<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import worker from "../spawn-worker";
  import type { WordAndCount, WordList, WordListSource } from "@common/types";
  import { WordAndCountInd } from "@common/types";

  export let tableData: WordListSource;

  /**
   * Close table
   */
  export let closeTable: Function;

  /**
   * Re-calculate word count
   */
  export let getLanguageSources: Function;

  $: wordlist = tableData.wordlist;
  $: validDictionary = validateTableData(tableData.name, tableData.wordlist);
  $: if (validateTableData(tableData.name, tableData.wordlist)) {
    saveTableData();
  }

  const validInput = (input: string): boolean => {
    return (
      input !== "" &&
      input !== undefined &&
      input !== null &&
      !input.match(/^([\s\t\r\n]*)$/)
    );
  };

  const validateTableData = (name: string, wordlist: WordList): boolean => {
    const validTitle = validInput(name);
    const validRows = wordlist.every((wordAndCount: WordAndCount) => {
      return validInput(wordAndCount[WordAndCountInd.WORD]);
    });
    return validTitle && validRows;
  };

  const deleteRow = (i: number): void => {
    wordlist.splice(i, 1);
    wordlist = wordlist;
  };

  const addRow = (): void => {
    const newEntry: WordAndCount = ["", 0];
    wordlist.push(newEntry);
    wordlist = wordlist;
  };

  const handleInput = (i: number, col: number) => (e: any) => {
    wordlist[i][col] = e.target.value;
    if (i === wordlist.length - 1) addRow();
  };

  const saveTableData = async () => {
    if (validDictionary) {
      if (tableData.id) {
        await worker.updateManualEntryDictionaryToProject(
          tableData.id,
          tableData.name,
          tableData.wordlist
        );
      } else {
        await worker.addManualEntryDictionaryToProject(
          tableData.name,
          tableData.wordlist
        );
      }
      getLanguageSources();
    }
  };

  onMount(addRow);
</script>

<style>
  .language__sources-manual-entry {
    display: flex;
    flex-direction: column;
    padding: 0.3125rem;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }

  .language__sources-manual-entry-tablename input {
    height: 1.875rem;
    width: 25rem;
    padding: 0.3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    background-color: var(--lite-white);
    font: 1.5em var(--main-font);
    text-align: center;
  }

  table {
    border-collapse: collapse;
    margin-top: 1.875rem;
    margin-bottom: 3.125rem;
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.1);
  }

  th {
    vertical-align: middle;
    padding: 1.25rem;
    background-color: var(--lite-white);
    text-align: center;
  }

  tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  td {
    vertical-align: middle;
    padding: 0.625rem 0 0.625rem 1.25rem;
    color: var(--gray-dark);
    text-align: start;
  }

  th:first-of-type {
    border-top-left-radius: 10px;
  }
  th:last-of-type {
    border-top-right-radius: 10px;
  }
  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }
  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
    text-align: center;
  }

  .btn--inline {
    display: inline;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 1em;
  }

  td > input {
    height: 1.25rem;
    width: 80%;
    padding: 0.3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    text-align: center;
    font: 1em var(--main-font);
  }

  input:focus {
    background-color: var(--lite-white);
    border-color: var(--primary-blue);
  }

  .save-zone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }

  img {
    width: var(--s);
  }
</style>

<form class="language__sources-manual-entry" on:submit|preventDefault>
  <div class="language__sources-manual-entry-tablename">
    <h4>{$_('common.table_name')}</h4>
    <input
      type="text"
      bind:value={tableData.name}
      required
      data-cy="manual-entry-input-tablename" />
  </div>

  <table id="manual-entry-table">
    <thead>
      <th>{$_('common.word')}</th>
      <th>{$_('common.count')}</th>
      <th>{$_('common.actions')}</th>
    </thead>
    {#each wordlist as row, i (i)}
      <tr>
        <td>
          <input
            type="text"
            on:input={handleInput(i, WordAndCountInd.WORD)}
            value={row[WordAndCountInd.WORD]}
            required
            data-cy="manual-entry-input-word" />
        </td>
        <td>
          <input
            type="number"
            min="0"
            placeholder={$_('common.optional')}
            on:input={handleInput(i, WordAndCountInd.COUNT)}
            value={row[WordAndCountInd.COUNT]}
            data-cy="manual-entry-input-count" />
        </td>
        <td>
          <button
            class="btn--inline"
            on:click={() => deleteRow(i)}
            data-cy="manual-entry-delete">
            <img src="/icons/delete.svg" alt="delete" />
          </button>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="3">
        <button
          class="btn--inline"
          on:click={addRow}
          data-cy="manual-entry-add-row">{$_('input.add_row')}</button>
      </td>
    </tr>
  </table>

  <div class="save-zone">
    <Button
      type="submit"
      color="blue"
      isOutlined
      size="large"
      onClick={saveTableData}
      dataCy="add-sources-save-btn">
      {$_('common.save')}
    </Button>
    <Button
      type="submit"
      color="grey"
      isOutlined
      size="large"
      onClick={() => closeTable()}
      dataCy="add-sources-close-btn">
      {$_('common.close')}
    </Button>
  </div>
</form>
