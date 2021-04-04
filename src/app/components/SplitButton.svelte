<script type="ts">
  export let color: string;
  export let size: string;
  export let hasDropShadow: boolean;
  export let isOutlined: boolean;
  export let type: string;
  export let onClick: () => void;
  export let dataCy: string | undefined;
</script>

<button
  class="button button--{color} button--{size}"
  class:button--shadow={hasDropShadow}
  class:button--outline={isOutlined}
  on:click={onClick}
  {type}
  data-cy={dataCy}><slot /></button>
