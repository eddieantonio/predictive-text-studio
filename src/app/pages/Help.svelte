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
  <nav class="nav-back"><a href="/" class="button button--blue">Back</a></nav>
  <article class="help-page">
    <header>
      <h1 class="header">What Do I Upload?</h1>
      <p>
        Predictive Text Studio uses the spreadsheet you provide to customize the
        words in your keyboard's dictionary. The "Word" column contains
        frequently used words in your language that you would like to add to
        your dictionary. The "Count" column gives the amount of times or
        frequency that a word appears in your text.
      </p>
    </header>
    <section>
      <h2>Excel</h2>
      <p>
        Create an Excel file with "Word" in the A column and "Count" in the B
        column. You may upload the Excel file directly to the Upload Area.
      </p>
      <div class="paragraph-container">
        <b>Example:</b>
        <a
          class="link"
          href="../assets/ExampleWordlist.xlsx">ExampleWordlist.xlsx</a>
      </div>
    </section>

    <section>
      <h2>Google Sheets</h2>
      <p>
        Create a Google Sheets spreadsheet with "Word" in the A column and
        "Count" in the B column. When you have completed the spreadsheet press
        the "Share" button in the top right corner of the Google Sheets
        interface and copy a link which "Anyone on the internet with this link
        can view". You may now paste this link in the Google Sheets URL input.
      </p>
      <p>
        <b>Example:</b>
        <a
          class="link"
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1S773hm37v9-cJWsDEZAGTbLt2O6dXurZbHwj4wFkHhI/edit?usp=sharing">
          Google Sheet Link</a>
      </p>
    </section>
    <section>
      <h2>TSV</h2>
      <p>
        TSV stands for Tab Separated Values. Like Excel or Google Sheets, create
        a text file with "Word" in the first column and "Count" in the second
        column. For exhaustive details on how your file should look, please
        visit the
        <a
          href="https://help.keyman.com/developer/current-version/reference/file-types/tsv"
          target="_blank">Keyman Website</a>. Make sure your file has a .tsv
        extension and upload it to the File Uploader.
      </p>
      <p>
        <b>Example:</b>
        <a class="link" href="../assets/ExampleWordlist.tsv">
          ExampleWordlist.tsv</a>
      </p>
    </section>
  </article>
</main>
