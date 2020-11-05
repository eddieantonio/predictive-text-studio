<script lang="ts">
  /**
   * Handles the click when the delte button is pressed
   * TODO
   */
  const handleDelete = (): void => {
    console.log("Delete button clicked");
  };
</script>

<style>
  .language__sources-manual-entry {
    border-radius: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .language__sources-manual-entry-tablename input {
    height: 30px;
    width: 400px;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    padding: 5px;
    text-align: center;
    font: 24px var(--main-font);
    background-color: var(--lite-white);
  }

  th {
    background-color: var(--lite-white);
    padding: 20px 0px 20px 20px;
    text-align: center;
    vertical-align: middle;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-top: 30px;
    margin-bottom: 100px;
    box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.1);
  }

  tr {
    border-bottom: 1pt solid var(--lite-white);
  }

  td {
    padding: 10px 0px 10px 20px;
    color: var(--gray-dark);
    text-align: center;
    vertical-align: middle;
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

  td>input {
    height: 20px;
    width: 80%;
    border-radius: 2px;
    border: 1px solid var(--lite-white);
    padding: 5px;
    text-align: center;
    font: 16px var(--main-font);
  }

  input:focus {
    background-color: var(--lite-white);
  }
</style>

<div class="language__sources-manual-entry">
  <div class="language__sources-manual-entry-tablename">
    <h4>Table Name</h4>
    <input data-cy="manual-entry-input-tablename"/>
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
          on:click={handleDelete}
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
                <button class="btn--inline" on:click={handleDelete}>Delete</button>
            </td>
        </tr>
  </table>
</div>
