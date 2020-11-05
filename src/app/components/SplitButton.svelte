<script lang="ts">
  // props
  export let colorLeft: string = "blue"; // optional
  export let colorRight: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let leftText: string;
  export let rightText: string;
  export let onClickLeft: (ev: MouseEvent) => void;
  export let onClickRight: (ev: MouseEvent) => void;
</script>

<style>
  .split-button-layout {
    display: inline-flex;
    padding: 3%;
  }
  button {
    margin: 0em;
    border-radius: 0rem;
    float: left;
    width: 10rem;
  }
  button:first-child {
    border-top-left-radius: 0.625em;
    border-bottom-left-radius: 0.625em;
  }
  button:last-child {
    border-left: 0em;
    border-top-right-radius: 0.625em;
    border-bottom-right-radius: 0.625em;
  }
</style>

<div class="split-button-layout">
  <button
    class="button button--{colorLeft} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    on:click={onClickLeft}>{leftText}</button>
  <button
    class="button button--{colorRight} button--{size}"
    class:button--shadow={hasDropShadow}
    class:button--outline={isOutlined}
    on:click={onClickRight}>{rightText}</button>
</div>
