<script lang="ts">
  // props
  export let colorLeft: string = "blue"; // optional
  export let colorRight: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let leftText: string;
  export let rightText: string;
  export let dataCyLeft: string;
  export let dataCyRight: string;
  export let onClickLeft: (ev: MouseEvent) => void;
  export let onClickRight: (ev: MouseEvent) => void;
</script>

<style>
  .split-button-layout {
    display: inline-flex;
    padding: 3%;
  }
  button {
    float: left;
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
  <button
    class="button button--{colorLeft} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    on:click={onClickLeft}
    data-cy={dataCyLeft}>{leftText}</button>
  <button
    class="button button--{colorRight} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    on:click={onClickRight}
    data-cy={dataCyRight}>{rightText}</button>
</div>
