<script lang="ts">
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
    color: var(--gray-medium-dark);
    opacity: 25%;
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
    Download KMP Package
  </a>
</div>
