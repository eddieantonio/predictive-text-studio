<script lang="ts">
  let extraClasses;
  export let languages: any[];
  export let selectedLanguage: string;
  export { extraClasses as class };

  import LanguageAvatar from "./LanguageAvatar.svelte";
</script>

<style>
  .sidebar {
    display: flex;
    height: 100vh;

    background-color: var(--gray-dark);

    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>

<nav class="sidebar {extraClasses}">
  {#each languages as language}
    <LanguageAvatar name={language.name} {selectedLanguage} />
  {/each}
</nav>
