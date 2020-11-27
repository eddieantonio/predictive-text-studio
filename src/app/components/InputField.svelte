<script lang="ts">
  export let label: string | undefined;
  /**
   * Component size options
   * Size option medium (default size) or large
   * ex: size = "large"
   */
  export let size: string | undefined = "";
  export let cyData: string | undefined = "";
  export let id: string;
  export let value: any;
  export let subtext = "";
  export let error = "";
  export let placeholder = "";
</script>

<style>
  label {
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

  .input-field__label--large {
    font: var(--main-font);
    font-size: var(--s);
    font-weight: normal;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-blue);
  }

  .input-field__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray-secondary-text);
    font-size: var(--xxs);
  }

  .error {
    padding-left: 5px;
    font-family: var(--mono-font), monospace;
    font-size: 12px;
    color: var(--red-light);
  }
</style>

<div class="input-field mt-s mb-m">
  <label
    class="input-field__label--{size} mt-s"
    for="input-{id}">{label}</label>
  <input
    class="mt-s"
    type="text"
    id="input-{id}"
    bind:value
    {placeholder}
    data-cy={cyData} />
  {#if error !== ''}
    <p class:error>{error}</p>
  {/if}
  {#if subtext !== ''}
    <p class="input-field__subtext">{subtext}</p>
  {/if}
</div>
