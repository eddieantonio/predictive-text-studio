<script lang="ts">
  import { beforeUpdate } from "svelte";

  // props
  export let color: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let text: string = ""; // required
  export let subtext: string = ""; // optional
  export let callbackFunction: any = null; // required

  export let className: string = "";

  /**
   * Creates the class name for the button if the styling props are passed
   *
   * @return {void}
   */
  const createStyles = (): void => {
    className += color;
    className += " " + size;
    isOutlined && (className += " outline");
    hasDropShadow && (className += " shadow");
  };

  beforeUpdate(async () => {
    createStyles();
  });
</script>

<style>
  button {
    margin: 0px 10px;
    border-radius: 10px;
    text-transform: uppercase;
    font-family: Cabin, sans-serif;
    font-size: 15px;
    font-weight: bold;
    transition-duration: 0.2s;
  }

  button:hover {
    cursor: pointer;
  }

  .small {
    padding: 5px 10px;
  }

  .medium {
    padding: 10px 20px;
  }

  .large {
    padding: 10px 60px;
  }

  .grey {
    background-color: #f1f1f1;
    border-width: 0px;
  }

  .grey:hover {
    background-color: #c5c5c5;
  }

  .grey.outline {
    border: 1px solid #bdbdbd;
    background-color: #ffffff;
  }

  .grey.outline:hover {
    background-color: #f1f1f1;
  }

  .blue {
    background-color: #0099ff;
    border-width: 0px;
    color: #fff;
  }

  .blue:hover {
    background-color: #006db6;
  }

  .blue.outline {
    border: 1px solid #0099ff;
    background-color: #ffffff;
    color: #0099ff;
  }

  .blue.outline:hover {
    background-color: #f1f1f1;
  }

  .shadow {
    box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.15);
  }

  .subtext {
    font-family: "Roboto Mono", monospace;
    color: #a4a4a4;
    font-size: 12px;
    margin-top: 5px;
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

{#if text && callbackFunction}
  <div class="button-layout">
    <button on:click={callbackFunction} class={className}> {text} </button>
    {#if subtext}
      <p class:subtext>{subtext}</p>
    {/if}
  </div>
{/if}
