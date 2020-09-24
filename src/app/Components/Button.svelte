<script lang="ts">
  // props
  let color: string = "grey"; // optional
  let isOutlined: boolean = false; // optional
  let hasDropShadow: boolean = false; // optional
  let size: string = "medium"; // optional
  export let text: string = ""; // required
  export let callbackFunction: any = null; // required

  export let className: string = "";

  /**
   * Creates the class name for the button if the styling props are passed
   *
   * @return {void}
   */
  const createStyles = (): void => {
    className = "";
    if (isOutlined) {
      className += " outlined";
    }

    className += color;
  };

  // If the color or outlined props are passed in, create custom styles. Else the default (grey, false) values will be used for the button.
  if (color || isOutlined) {
    createStyles();
  }
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
    padding: 20px 40px;
  }

  .grey {
    background-color: #bdbdbd;
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
  }

  .blue:hover {
    background-color: #006db6;
  }

  .blue.outline {
    border: 1px solid #0099ff;
    background-color: #ffffff;
  }

  .blue.outline:hover {
    background-color: #f1f1f1;
  }
</style>

{#if text && callbackFunction}
  <button on:click={callbackFunction} class={className}> {text} </button>
{/if}
