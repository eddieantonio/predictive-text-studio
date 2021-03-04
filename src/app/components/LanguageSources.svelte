<script lang="ts">
  import AddSource from "./AddSource.svelte";
  import type { WordListSource } from "@common/types";
  export let sources: WordListSource[];

  /**
   * Re-calculate word count
   */
  export let getLanguageSources = async () => {};

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

  const englishNameOf = {
    "direct-entry": "Direct entry",
    "google-sheets": "Google Sheets",
    tsv: "TSV",
    xlsx: ".xlsx",
  };
</script>

<style>
  th {
    text-align: left;
    background-color: var(--lite-white);
    padding: 20px 0px 20px 20px;
  }

  table {
    border-collapse: collapse;
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
    padding: 20px;
  }
  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }
  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
  }

  .actions__action:not(:first-of-type) {
    /* this should be `gap`, but there isn't enough support at the moment
     * https://caniuse.com/flexbox-gap 😭😭😭 */
    margin-left: 1.5ch;
  }

  .btn--inline {
    padding: 0;
    border: 0;
    background-color: transparent;
  }

  img {
    width: var(--s);
  }

  @media (max-width: 768px) {
    .language__sources--table {
      overflow: scroll;
    }
  }
</style>

<div class="language__sources">
  <div class="language__sources--table">
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
          <td>{englishNameOf[source.type]}</td>
          <td class="table__row--actions actions">
            <button class="actions__action btn--inline" on:click={handleEdit}>
              <img src="/icons/edit.svg" alt="edit" />
            </button>
            <button class="actions__action btn--inline" on:click={handleDelete}>
              <img src="/icons/delete.svg" alt="delete" />
            </button>
          </td>
        </tr>
      {/each}
    </table>
  </div>
  <details data-cy="language-sources-add-sources">
    <summary>Add Source</summary>
    <AddSource getLanguageSources={getLanguageSources} />
  </details>
</div>
