<script lang="ts">
  export let languages: any[];
  export let selectedLanguage: string;

  import LanguageAvatar from "./LanguageAvatar.svelte";
</script>

<style>
  .sidebar {
    height: 100%;
    background-color: var(--gray-dark);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>

<div class="sidebar">
  {#each languages as language}
    <LanguageAvatar name={language.name} {selectedLanguage} />
  {/each}
</div>
