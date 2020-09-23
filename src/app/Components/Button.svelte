<script lang="ts">
  let color: string = "grey";
  let isOutlined: boolean = false;
  export let text: string = "";
  export let callbackFunction: any = null;
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

<button on:click={callbackFunction} class={className}> {text} </button>
