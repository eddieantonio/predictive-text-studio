<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<style>
  .help-page {
    width: 75%;
    margin: 1.5em auto 5rem;
  }

  .header {
    font-size: var(--xxl);
  }

  .nav-back {
    margin: 1rem 0 0 1rem;
  }

  p {
    margin: 1rem 0 1rem 0;
  }

  .link {
    margin-left: 1rem;
  }
</style>

<main>
  <nav class="nav-back">
    <a href="/" class="button button--blue">{$_('common.back')}</a>
  </nav>
  <article class="help-page">
    <header>
      <h1 class="header">{$_('page.help.title')}</h1>
      <p>{$_('page.help.intro')}</p>
    </header>
    <section>
      <h2>{$_('common.excel')}</h2>
      <p>{$_('page.help.excel_instruction')}</p>
      <div class="paragraph-container">
        <b>{$_('common.example')}:</b>
        <a
          class="link"
          href="../assets/ExampleWordlist.xlsx">ExampleWordlist.xlsx</a>
      </div>
    </section>

    <section>
      <h2>{$_('common.google_sheets')}</h2>
      <p>{$_('page.help.google_sheets_instruction')}</p>
      <p>
        <b>{$_('common.example')}:</b>
        <a
          class="link"
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1S773hm37v9-cJWsDEZAGTbLt2O6dXurZbHwj4wFkHhI/edit?usp=sharing">
          Google Sheet Link</a>
      </p>
    </section>
    <section>
      <h2>{$_('common.tsv')}</h2>
      <p>
        {$_('page.help.tsv_instruction')}
        <a
          href="https://help.keyman.com/developer/current-version/reference/file-types/tsv"
          target="_blank">{$_('page.help.keyman')}</a>.
      </p>
      <p>
        <b>{$_('common.example')}:</b>
        <a class="link" href="../assets/ExampleWordlist.tsv">
          ExampleWordlist.tsv</a>
      </p>
    </section>
  </article>
</main>
