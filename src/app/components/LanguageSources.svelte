<script lang="ts">
  import AddSource from "./AddSource.svelte";
  import type { StoredWordList } from "../types";
  export let sources: StoredWordList[];

  /**
   * Handles the click when the edit button is pressed.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleEdit = (): void => {};

  /**
   * Handles the click when the delete button is pressed.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleDelete = (): void => {};
</script>

<style>
  .language__sources {
    border-radius: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  th {
    text-align: left;
    background-color: var(--lite-white);
    padding: 20px 0px 20px 20px;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-bottom: 100px;
    box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.1);
  }

  tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  td {
    padding: 10px 0px 10px 20px;
    color: var(--gray-dark);
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
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
  }

  .actions__action:not(:first-of-type) {
    /* this should be `gap`, but there isn't enough support at the moment
     * https://caniuse.com/flexbox-gap 😭😭😭 */
    margin-left: 1.5ch;
  }

  .btn--inline {
    display: inline;
    padding: 0;
    border: 0;
    background-color: transparent;
    font-size: var(--s);
  }
</style>

<div class="language__sources">
  <table class="mt-l">
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>

    {#each sources as source}
      <tr>
        <td>{source.name}</td>
        <td>{source.size}</td>
        <td>{source.type}</td>
        <td class="table__row--actions actions">
          <button
            class="actions__action btn--inline"
            on:click={handleEdit}>Edit</button>
          <button
            class="actions__action btn--inline"
            on:click={handleDelete}>Delete</button>
        </td>
      </tr>
    {/each}
  </table>
  <details data-cy="language-sources-add-sources">
    <summary>Add Source</summary>
    <AddSource />
  </details>
</div>
