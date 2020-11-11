<script lang="ts">
  // props
  export let color: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let subtext: string = ""; // optional
  export let data_cy: string = ""; // optional
  export let onClick: (ev: MouseEvent) => void;
</script>

<style>
  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: 12px;
    margin-top: 10px;
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
    on:click={onClick}
    data-cy={data_cy}><slot /></button>
  {#if subtext}
    <p class="subtext">{subtext}</p>
  {/if}
</div>
