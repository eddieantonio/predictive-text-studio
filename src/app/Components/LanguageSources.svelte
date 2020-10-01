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
    background-color: #b6b6b6;
    padding: 20px 20px 20px 5px;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
    margin-bottom: 30px;
  }

  tr {
    border-bottom: 1pt solid black;
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
    <tr>
      <th>Name</th>
      <th>Size</th>
      <th>Type</th>
      <th>Actions</th>
    </tr>

    {#each sources as source}
      <tr>
        <td>{source.name}</td>
        <td>{source.size}</td>
        <td>{source.type}</td>
        <td>
          <div class="table__row--actions">
            <p>Edit</p>
            <p>Delete</p>
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
