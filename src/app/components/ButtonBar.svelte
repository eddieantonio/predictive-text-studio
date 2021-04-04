<!--
  This component provides styling for any component <button>s, but otherwise
  provides no additional functionality.
-->
<style>
  .split-button-layout {
    display: flex;
    padding: 3%;
  }

  .split-button-layout > :global(button) {
    flex: 1;
    margin: 0;
    border-radius: 0;
  }
  .split-button-layout > :global(button):first-child {
    border-top-left-radius: 0.625em;
    border-bottom-left-radius: 0.625em;
  }
  .split-button-layout > :global(button):last-child {
    border-top-right-radius: 0.625em;
    border-bottom-right-radius: 0.625em;
  }
</style>

<div class="split-button-layout">
  <slot />
</div>
