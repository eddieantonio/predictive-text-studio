<script lang="ts">
  // props
  export let color: string = "grey"; // optional
  export let type: string = "button"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let subtext: string = ""; // optional
  export let dataCy: string = ""; // optional
  export let enabled: boolean = true; // optional
  export let onClick: (ev: MouseEvent) => void;

  function whenButtonDepressed(event) {
    if (enabled) onClick(event);
  }
</script>

<style>
  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray-secondary-text);
    font-size: var(--xxs);
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button--disabled {
    cursor: not-allowed;
  }

  .button--disabled.button--outline {
    color: var(--gray-disabled);
    border-color: var(--gray-disabled);
  }

  @media (max-width: 768px) {
    .button {
      margin: 0.25rem auto;
      width: 100%;
    }
  }
</style>

<div class="button-layout">
  <button
    class="button button--{color} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    class:button--disabled={!enabled}
    {type}
    on:click={whenButtonDepressed}
    data-cy={dataCy}><slot /></button>
  {#if subtext}
    <p class="subtext mt-xs">{subtext}</p>
  {/if}
</div>
