<script lang="ts">
  export let results: any = ["1111", "222"];
  let selected;
  const handleClick = (index = -1): void => {};
  function onChange(event: InputEvent) {
    console.log(event.target.value);
    console.log(
      results.findIndex((result) => {
        return result.startsWith(event.target.value);
      }, event.target.value)
    );
  }
</script>

<style>
</style>

<svelte:window
  on:click={() => {
    handleClick();
  }} />

<div>
  <input type="text" on:input={(event) => onChange(event)} />
  <ul>
    {#each results as result, i}
      <li>
        <div>{result}</div>
      </li>
    {/each}
  </ul>
</div>
