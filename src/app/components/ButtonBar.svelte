<script lang="ts">
  import SplitButton from "./SplitButton.svelte";

  type ClickFnType = () => void;

  interface BtnAttributes {
    color: string;
    size: string;
    text: string;
    isOutlined: boolean;
    hasDropShadow: boolean;
    dataCy: string;
    handleClick: ClickFnType;
    type: string;
  }

  export let splitBtns: BtnAttributes[];
</script>

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
  {#each splitBtns as setting}
    <SplitButton
      color={setting.color}
      size={setting.size}
      type={setting.type}
      hasDropShadow={setting.hasDropShadow}
      isOutlined={setting.isOutlined}
      onClick={setting.handleClick}
      dataCy={setting.dataCy}>
      {setting.text}
    </SplitButton>
  {/each}
</div>
