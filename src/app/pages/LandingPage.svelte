<script lang="ts">
  import Upload from "../components/Upload.svelte";
  import BCP47Tag from "../components//BCP47Tag.svelte";

  import routes from "../routes";
</script>

<svelte:head>
  <title> Welcome to Predictive Text Studio </title>
</svelte:head>

<main>
  <header>
    <p role="doc-subtitle">Keyman</p>
    <h1>Predictive Text Studio</h1>

    <p> Add <strong>prediction</strong> and <strong>autocorrect</strong> to your language </p>
  </header>

  <section id="explanation">
    <!-- TODO: figure that explains the flow -->

    <a href="#get-started" class="button button--primary">Get started</a>
  </section>

  <section id="get-started" class="quick-start">
    <!-- TODO: should not use hard coded URL! -->
    <form action={routes.projectInfo}>
      <fieldset>
        <legend> Step 1: Select your language </legend>
        <BCP47Tag />
      </fieldset>

      <fieldset>
        <legend> Step 2: Attach a word list </legend>
        <Upload />
      </fieldset>

      <button type="submit"> Upload </button>
    </form>
  </section>

  <footer>
    <p><small> © 2020 <a href="https://github.com/eddieantonio/predictive-text-studio/graphs/contributors">
      Eddie Antonio Santos and contributors
    </a>.</small></p>
  </footer>
</main>
