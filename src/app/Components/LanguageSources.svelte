<script lang="ts">
  export let sources: any[];
</script>

<style>
  .language__sources {
    border-radius: 20px;
    padding: 5px;
  }

  th {
    text-align: left;
    background-color: #b6b6b6;
    padding: 20px 20px 20px 5px;
  }

  table {
    border-collapse: collapse;
    width: 1400px;
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
  <button>Add Source</button>
</div>
