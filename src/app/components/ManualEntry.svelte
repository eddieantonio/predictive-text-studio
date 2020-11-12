<script lang="ts">
  /**
   * Handles the click when the delete button is pressed
   * TODO
   */
  const deleteRow = (): void => {};
</script>

<style>
  .language__sources-manual-entry {
    display: flex;
    flex-direction: column;
    padding: .3125rem;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }

  .language__sources-manual-entry-tablename input {
    height: 30px;
    width: 400px;
    padding: .3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    background-color: var(--lite-white);
    font: 1.5em var(--main-font);
    text-align: center;
  }

  th {
    vertical-align: middle;
    padding: 1.25rem 0 1.25rem 1.25rem;
    background-color: var(--lite-white);
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-top: 1.875rem;
    margin-bottom: 3.125rem;
    box-shadow: 0 25px 40px 0 rgba(0, 0, 0, 0.1);
  }

  tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  td {
    vertical-align: middle;
    padding: .625rem 0 .625rem 1.25rem;
    color: var(--gray-dark);
    text-align: center;
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

  .btn--inline {
    display: inline;
    padding: 0;
    border: 0;
    background-color: transparent;
    font-size: 1em;
  }

  td > input {
    height: 20px;
    width: 80%;
    padding: .3125rem;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    text-align: center;
    font: 1em var(--main-font);
  }

  input:focus {
    background-color: var(--lite-white);
  }
</style>

<div class="language__sources-manual-entry">
  <div class="language__sources-manual-entry-tablename">
    <h4>Table Name</h4>
    <input data-cy="manual-entry-input-tablename" />
  </div>

  <table>
    <thead>
      <th>Word</th>
      <th>Count</th>
      <th>Action</th>
    </thead>

    <tr>
      <td><input type="text" data-cy="manual-entry-input-word" /></td>
      <td>
        <input
          type="number"
          placeholder="Optional"
          data-cy="manual-entry-input-count" />
      </td>
      <td>
        <button
          class="btn--inline"
          on:click={deleteRow}
          data-cy="manual-entry-delete">Delete</button>
      </td>
    </tr>
    <!-- TODO: hard code new row for now, but we can auto generate new row later -->
    <tr>
            <td>
                <input type="text" />
            </td>
            <td>
                <input type="number" placeholder="Optional" />
            </td>
            <td>
                <button class="btn--inline" on:click={deleteRow}>Delete</button>
            </td>
        </tr>
  </table>
</div>
