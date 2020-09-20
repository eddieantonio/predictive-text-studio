<script lang="ts">
  export let languages: object[];
  import LanguageAvatar from "./LanguageAvatar.svelte";
</script>

<style>
  .sidebar {
    height: 100%;
    background-color: #454545;
  }
</style>

<div class="sidebar">
  {#each languages as language}
    <LanguageAvatar name={language.name} />
  {/each}
</div>
