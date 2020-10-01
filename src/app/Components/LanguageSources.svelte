<script lang="ts">
  import Button from "./Button.svelte";
  export let sources: any[];

  /**
   * Handles the click when the add source button is pressed. Should show another section where user can upload file or open direct entry.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleAddSource = (): void => {
    console.log("Add source button clicked");
  };

  /**
   * Handles the click when the edit button is pressed.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleEdit = (): void => {
    console.log("Edit button clicked");
  };

  /**
   * Handles the click when the delete button is pressed.
   * TODO: Replace stub
   *
   * @return {void}
   */
  const handleDelete = (): void => {
    console.log("Delete button clicked");
  };
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
    background-color: #f1f1f1;
    padding: 20px 0px 20px 20px;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-top: 30px;
    margin-bottom: 100px;
    box-shadow: 0px 25px 40px 0px rgba(0, 0, 0, 0.1);
  }

  tr {
    border-bottom: 1pt solid #f1f1f1;
  }

  td {
    padding: 10px 0px 10px 20px;
    color: #5e5e5e;
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

  .table__row--actions {
    display: flex;
    flex-direction: row;
  }

  .table__row--actions p {
    margin-left: 10px;
  }
</style>

<div class="language__sources">
  <table>
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
        <td>
          <div class="table__row--actions">
            <p on:click={handleEdit}>Edit</p>
            <p on:click={handleDelete}>Delete</p>
          </div>
        </td>
      </tr>
    {/each}
  </table>
  <Button
    color="blue"
    isOutlined={true}
    text="Add Source"
    size="large"
    callbackFunction={handleAddSource} />
</div>
