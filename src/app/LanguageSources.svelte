<script lang="ts">
  export let sources: object[];
</script>

<style>
  th {
    text-align: left;
    background-color: #b6b6b6;
    padding: 20px 20px 20px 5px;
  }

  table {
    border-collapse: collapse;
    margin-top: 50px;
    width: 75%;
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

<div>
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
</div>
