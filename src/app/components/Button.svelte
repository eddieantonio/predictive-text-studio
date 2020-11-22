<script lang="ts">
  // props
  export let color: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let subtext: string = ""; // optional
  export let dataCy: string = ""; // optional
  export let disabled: boolean = false; // optional
  export let onClick: (ev: MouseEvent) => void;
</script>

<style>
  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="button-layout">
  <button
    class="button button--{color} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    class:button--disabled={disabled}
    on:click={onClick}
    data-cy={dataCy}><slot /></button>
  {#if subtext}
    <p class="subtext mt-s">{subtext}</p>
  {/if}
</div>
