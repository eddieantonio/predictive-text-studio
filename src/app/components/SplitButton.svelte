<script lang="ts">
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
  button {
    width: 160px;
    margin: 0;
    border-radius: 0;
  }
  button:first-child {
    border-top-left-radius: 0.625em;
    border-bottom-left-radius: 0.625em;
  }
  button:last-child {
    border-top-right-radius: 0.625em;
    border-bottom-right-radius: 0.625em;
  }
</style>

<div class="split-button-layout">
  {#each splitBtns as setting}
    <button
      class="button button--{setting.color} button--{setting.size}"
      class:button--shadow={setting.hasDropShadow}
      class:button--outline={setting.isOutlined}
      on:click={setting.handleClick}
      type={setting.type}
      data-cy={setting.dataCy}>{setting.text}</button>
  {/each}
</div>
