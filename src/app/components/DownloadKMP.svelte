<script lang="ts">
  export let downloadURL: string;
</script>

<style>
  .download-link {
    display: block;
    margin-top: 1.5em;
  }

  .download-link--disabled {
    color: var(--gray-medium-dark);
    cursor: not-allowed;

    opacity: 25%;
    text-decoration: none;
  }
</style>

<a
  href={downloadURL ? downloadURL : '#'}
  download="Example.kmp"
  class="download-link"
  class:download-link--disabled={downloadURL == ''}
  data-cy="download-kmp"
  data-download-state={downloadURL ? 'ready' : 'disabled'}>
  Download KMP Package
</a>
