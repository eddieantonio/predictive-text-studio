<script lang="ts">
  export let label = "";
  export let id: string;
  export let value: any;
  export let subtext = "";
  export let error = "";
  export let placeholder = "";
</script>

<style>
  .label {
    font-family: var(--main-font), sans-serif;
    font-weight: bold;
    font-size: var(--xs);
  }

  input {
    display: block;
    font-family: var(--secondary-font), sans-serif;
    font-size: var(--m);
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: var(--gray);
    border-style: solid;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-blue);
  }

  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }

  .error {
    padding-left: 5px;
    font-family: var(--mono-font), monospace;
    font-size: 12px;
    color: var(--red-light);
  }
</style>

<div class="input_field mt-s mb-m">
  {#if label !== ''}
    <label class="mt-s" for="input-{id}" class:label>{label}</label>
  {/if}
  <input class="mt-s" type="text" id="input-{id}" bind:value {placeholder} />
  {#if error !== ''}
    <p class:error>{error}</p>
  {/if}
  {#if subtext !== ''}
    <p class:subtext>{subtext}</p>
  {/if}
</div>
