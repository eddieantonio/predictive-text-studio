<script lang="ts">
  import { _ } from "svelte-i18n";
  export let downloadURL: string;
</script>

<style>
  .download-component--disabled {
    cursor: not-allowed;
  }
  .download-component__link {
    display: block;
    margin-top: 1.5em;
  }

  .download-component__link--disabled {
    color: var(--gray-disabled);
    pointer-events: none;
    text-decoration: none;
  }
</style>

<div
  class="download-component"
  class:download-component--disabled={downloadURL == ''}>
  <a
    href={downloadURL ? downloadURL : '#'}
    download="Example.kmp"
    class="download-component__link"
    class:download-component__link--disabled={downloadURL == ''}
    data-cy="download-kmp"
    data-download-state={downloadURL ? 'ready' : 'disabled'}>
    {$_('input.download_kmp_package')}
  </a>
</div>
