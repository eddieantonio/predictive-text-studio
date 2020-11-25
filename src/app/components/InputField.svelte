<script lang="ts">
  export let label = "";
  export let id: string;
  export let value: any;
  export let subtext = "";
  export let error = "";
  export let placeholder = "";
  // LanaugeDirection default is set to Left To Right
  export let languageDirection: string | undefined = "ltr";
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

<div class="input_field mb-m">
  {#if label !== ''}
    <p class:label dir={languageDirection}>{label}</p>
  {/if}
  <input type="text" {id} bind:value {placeholder} dir={languageDirection} />
  {#if error !== ''}
    <p class:error dir={languageDirection}>{error}</p>
  {/if}
  {#if subtext !== ''}
    <p class:subtext dir={languageDirection}>{subtext}</p>
  {/if}
</div>
