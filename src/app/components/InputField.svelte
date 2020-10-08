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
    font-size: 14px;
  }

  .input_field {
    margin-bottom: 20px;
  }

  input {
    font-family: var(--secondary-font), sans-serif;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
  }

  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: 12px;
  }
</style>

<div class="input_field">
  <p class:label>{label}</p>
  <input type="text" {id} {value} />
  {#if subtext}
    <p class:subtext>{subtext}</p>
  {/if}
</div>
