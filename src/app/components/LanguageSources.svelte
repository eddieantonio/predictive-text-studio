<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { StoredWordList } from "@common/types";
  import { removeDictionaryFromProject } from "../logic/delete";
  import AddSource from "./AddSource.svelte";
  import ManualEntry from "./ManualEntry.svelte";
  export let sources: StoredWordList[];

  /**
   * Re-calculate word count
   */
  export let getLanguageSources: Function;
  export let project: number;

  let selected: StoredWordList | null = null;

  /**
   * Handles the click when the edit button is pressed.
   * TODO: Replace stub
   *
   * @return {void}
   */
  function handleEdit(sourceToEdit: StoredWordList): void {
    selected = sourceToEdit;
  }

  /**
   * Handles the click when the delete button is pressed.
   *
   * @return {void}
   */
  async function handleDelete(sourceToDelete: StoredWordList): Promise<void> {
    await removeDictionaryFromProject(sourceToDelete.name, project);
    sources = sources.filter((source) => source.name != sourceToDelete.name);
  }

  const englishNameOf = {
    "direct-entry": "Direct entry",
    "google-sheets": "Google Sheets",
    tsv: "TSV",
    xlsx: ".xlsx",
  };

  export const closeTable = () => {
    selected = null;
  };
</script>

<style>
  th {
    text-align: left;
    background-color: var(--gray-light);
    padding: 20px;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 100px;
    box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  tr.selected,
  tr:hover,
  tr:active {
    background: var(--lite-white);
  }

  td {
    padding: 10px;
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

  td:first-of-type {
    text-align: left;
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
    cursor: pointer;
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
    {#if sources.length}
      <table class="mt-l">
        <thead>
          <tr>
            <th>{$_('common.name')}</th>
            <th>{$_('common.size')}</th>
            <th>{$_('common.type')}</th>
            <th>{$_('common.actions')}</th>
          </tr>
        </thead>
        {#each sources as source}
          <tr class:selected={source.id === selected?.id}>
            <td>{source.name}</td>
            <td>{source.size}</td>
            <td>{englishNameOf[source.type]}</td>
            <td class="table__row--actions actions">
              <button
                class="actions__action btn--inline"
                on:click={() => handleEdit(source)}
                data-cy="language-source-edit">
                <img src="/icons/edit.svg" alt="edit" />
              </button>
              <button
                class="actions__action btn--inline"
                on:click={() => handleDelete(source)}
                data-cy="language-source-delete">
                <img src="/icons/delete.svg" alt="delete" />
              </button>
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      <div
        style="text-align: center; padding: 10px; background: var(--lite-white); margin-bottom: 100px;">
        <h3>{$_('page.lang.no_source')}</h3>
        <p>{$_('page.lang.no_source_subtitle')}</p>
      </div>
    {/if}
    {#if selected !== null}
      <ManualEntry tableData={selected} {getLanguageSources} {closeTable} />
    {/if}
  </div>
  <details data-cy="language-sources-add-sources">
    <summary>{$_('input.add_source')}</summary>
    <AddSource {project} {getLanguageSources} />
  </details>
</div>
