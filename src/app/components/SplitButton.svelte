<script type="ts">
  export let color: string = "grey";
  export let size: string = "small";
  export let hasDropShadow: boolean = false;
  export let isOutlined: boolean = false;
  export let type: "button" | "submit" | "dialog" = "button";
  export let onClick: () => void;
  export let dataCy: string | undefined;
</script>

<button
  {type}
  class="button button--{color} button--{size}"
  class:button--shadow={hasDropShadow}
  class:button--outline={isOutlined}
  on:click={onClick}
  data-cy={dataCy}><slot /></button>
