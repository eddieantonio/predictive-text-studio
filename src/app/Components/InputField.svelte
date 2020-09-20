<script lang="ts">
  export let label: string;
  export let id: string;
  export let value: any;
  export let subtext: string;
</script>

<div class="input">
  <h3>{label}</h3>
  <input type="text" {id} {value} />
  {#if subtext}
    <p>{subtext}</p>
  {/if}
</div>
