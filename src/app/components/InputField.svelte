<script lang="ts">
  export let label: string;
  export let id: string;
  export let value: any;
  export let subtext: string;
</script>

<style>
  .label {
    font-family: var(--main-font), sans-serif;
    font-weight: bold;
    font-size: var(--xs);
  }

  input {
    font-family: var(--secondary-font), sans-serif;
    font-size: var(--m);
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
  }

  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }
</style>

<div class="input_field mb-m">
  <p class:label>{label}</p>
  <input type="text" {id} {value} />
  {#if subtext}
    <p class:subtext>{subtext}</p>
  {/if}
</div>
