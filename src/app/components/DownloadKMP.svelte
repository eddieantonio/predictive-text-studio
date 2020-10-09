<script lang="ts">
    export let downloadUrl: string;
</script>

<style>
    .download-link {
        display: block;
        margin-top: 1.5em;
    }

    .download-link--disabled {
        color: var(--gray-medium-dark);
        cursor: not-allowed;
    }
</style>

<div>
    <a
        href={downloadUrl ? downloadUrl : "#"}
        download="Example.kmp"
        class="download-link"
        class:download-link--disabled={downloadUrl == ""}
    > Download KMP Package </a>
</div>
  