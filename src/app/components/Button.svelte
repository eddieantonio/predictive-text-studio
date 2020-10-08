<script lang="ts">
  import { beforeUpdate } from "svelte";

  // props
  export let color: string = "grey"; // optional
  export let isOutlined: boolean = false; // optional
  export let hasDropShadow: boolean = false; // optional
  export let size: string = "medium"; // optional
  export let subtext: string = ""; // optional
  export let onClick: (ev: MouseEvent) => void;
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
    background-color: var(--lite-white);
    border-width: 0px;
  }

  .grey:hover {
    background-color: var(--gray-hover);
  }

  .grey.outline {
    border: 1px solid var(--gray-hover);
    background-color: var(--white);
  }

  .grey.outline:hover {
    background-color: var(--lite-white);
  }

  .blue {
    background-color: var(--primary-blue);
    border-width: 0px;
    color: var(--white);
  }

  .blue:hover {
    background-color: var(--dark-blue);
  }

  .blue.outline {
    border: 1px solid var(--primary-blue);
    background-color: var(--white);
    color: var(--primary-blue);
  }

  .blue.outline:hover {
    background-color: var(--lite-white);
  }

  .shadow {
    box-shadow: 0px 25px 30px rgba(0, 0, 0, 0.15);
  }

  .subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: 12px;
    margin-top: 10px;
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

<div class="button-layout">
  <button
    class="{color} {size}"
    class:shadow={hasDropShadow}
    class:outline={isOutlined}
    on:click={onClick}><slot /></button>
  {#if subtext}
    <p class="subtext">{subtext}</p>
  {/if}
</div>
