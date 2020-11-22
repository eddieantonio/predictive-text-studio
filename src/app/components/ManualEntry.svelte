<script lang="ts">
  import Button from "./Button.svelte";
  import worker from "../spawn-worker";

  interface rowDataObj {
    word: string;
    count: number | undefined;
  }

  export let tableData: {
    name: string;
    data: rowDataObj[];
  };

  let rowDataFromManualEntry = tableData.data;
  let columns = [
    {
      label: "Word",
      name: "word",
    },
    {
      label: "Count",
      name: "count",
    },
    {
      label: "Action",
      name: "action",
    },
  ];
  $: validInput = rowDataFromManualEntry.every((element) =>
    validateRowData(element)
  );
  $: btnColor = validInput ? "blue" : "grey";

  const validateRowData = (rowData: rowDataObj): boolean => {
    const word = rowData.word;
    return word !== "" && word !== undefined && word !== null;
  };

  const deleteRow = (i: number): void => {
    const part = rowDataFromManualEntry.splice(i, 1);
    rowDataFromManualEntry = rowDataFromManualEntry;
  };

  const addNewRow = (): void => {
    rowDataFromManualEntry.push({ word: "", count: undefined });
    rowDataFromManualEntry = rowDataFromManualEntry;
  };

  const saveTableData = async () => {
    const numOfWordStored = await worker.addManualEntryDictionaryToProject(
      tableData
    );
  };
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
    height: 30px;
    width: 400px;
    padding: 0.3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    background-color: var(--lite-white);
    font: 1.5em var(--main-font);
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-top: 1.875rem;
    margin-bottom: 3.125rem;
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.1);
  }

  table th {
    vertical-align: middle;
    padding: 1.25rem 0 1.25rem 1.25rem;
    background-color: var(--lite-white);
    text-align: center;
  }

  table tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  table td {
    vertical-align: middle;
    padding: 0.625rem 0 0.625rem 1.25rem;
    color: var(--gray-dark);
    text-align: center;
  }

  table th:first-of-type {
    border-top-left-radius: 10px;
  }
  table th:last-of-type {
    border-top-right-radius: 10px;
  }
  table tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }
  table tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
  }

  table .btn--inline {
    display: inline;
    padding: 0;
    border: 0;
    background-color: transparent;
    font-size: 1em;
  }

  table td > input {
    height: 20px;
    width: 80%;
    padding: 0.3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    text-align: center;
    font: 1em var(--main-font);
  }

  table input:focus {
    background-color: var(--lite-white);
  }

  table p {
    display: inline;
    color: var(--red);
  }

  .save-zone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1%;
  }
</style>

<div class="language__sources-manual-entry">
  <div class="language__sources-manual-entry-tablename">
    <h4>Table Name</h4>
    <input
      type="text"
      bind:value={tableData.name}
      data-cy="manual-entry-input-tablename" />
  </div>

  <table id="manual-entry-table">
    <thead>
      {#each columns as column (column.name)}
        <th>{column.label}</th>
      {/each}
      <th />
    </thead>

    {#each rowDataFromManualEntry as row, i (i)}
      <tr>
        <td>
          <input
            type="text"
            bind:value={row.word}
            data-cy="manual-entry-input-word" />
          {#if !validateRowData(row)}
            <p>*</p>
          {/if}
        </td>
        <td>
          <input
            type="number"
            min="0"
            placeholder="Optional"
            bind:value={row.count}
            data-cy="manual-entry-input-count" />
        </td>
        <td>
          <button
            class="btn--inline"
            on:click={() => deleteRow(i)}
            data-cy="manual-entry-delete">Delete</button>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="3">
        <button
          class="btn--inline"
          on:click={addNewRow}
          data-cy="munual-entry-add-row">Add Row</button>
      </td>
    </tr>
  </table>

  <div class="save-zone">
    <Button
      color={btnColor}
      isOutlined
      disabled={!validInput}
      size="large"
      onClick={saveTableData}
      dataCy="add-sources-save-btn">
      Save
    </Button>
  </div>
</div>
