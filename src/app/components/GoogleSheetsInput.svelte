<script>
  import worker from "../spawn-worker";

  import InputField from "./InputField.svelte";

  var error = null;
  let googleSheetsURL = "";

  // Constants for checking headers
  const WORD = 0;
  const COUNT = 1;

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    error = null;
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((e) => {
        error = `Error: Could not connect to Google Sheets: ${e}`;
      });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (!isSignedIn) {
      signInToGoogleAPI();
    }
    getValuesFromSpreadSheet();
  }

  /**
   *  Sign in the user upon button click.
   */
  function signInToGoogleAPI() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   * Gets the unique spreadsheet ID from a Google Sheet URL
   *
   */
  function getSpreadsheetId() {
    // TODO: should not use id; should make use of bindings
    googleSheetsURL = document.getElementById("input-googleSheetsURL").value;

    const googleSheetRegExp = RegExp(
      "http(s?)://docs.google.com/spreadsheets/[a-z]/[\\w-]+/[\\w#=-]+"
    );

    if (googleSheetRegExp.test(googleSheetsURL)) {
      return googleSheetsURL.split("/")[5];
    } else {
      error = `Error: The url ${googleSheetsURL} is not a valid Google Sheets URl. Please paste a valid one.`;
    }
  }

  /**
   * Returns a boolean if the row should be converted.
   * The row should not be converted if it is a header row or a commented out row.
   */
  function shouldRowBeConverted(row) {
    const isHeaderRow = row[COUNT].toLowerCase().includes("count");
    const isCommentRow = row[WORD] === "#";
    return !isHeaderRow && !isCommentRow;
  }

  /**
   * Read word and count form storage
   * Sample: https://docs.google.com/spreadsheets/d/1lzHxoMWHpdGecby4d0y15AVf80csA7iNkaMMEL54Q7g/edit#gid=0
   */

  async function getValuesFromSpreadSheet() {
    const wordListObject = [];
    const spreadsheetId = getSpreadsheetId() || "";
    if (error) {
      return;
    }

    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: "A1:B",
      });
    } catch {
      error = "Error: " + response.result.error.message;
      return;
    }

    const range = response.result;
    if (range.values.length <= 0) {
      error = "Error: No data found in the Google Sheet.";
      return;
    }
    console.log("SUCCess");
    for (let i = 0; i < range.values.length; i++) {
      const row = range.values[i];
      if (shouldRowBeConverted(row)) {
        const word = row[WORD];
        let wordCount = row[COUNT];
        if (!wordCount) {
          wordCount = 0;
        }
        wordListObject.push([word, wordCount]);
      }
    }
    error = null;

    worker.readGoogleSheet(spreadsheetId, wordListObject);
  }
</script>

<style>
  .google-sheets {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .error {
    background-color: #f8d7db;
    color: #400000;
    padding: 0.3125rem 0.625rem;
  }
</style>

<svelte:head>
  <script async defer src="https://apis.google.com/js/api.js">
  </script>
</svelte:head>

<div class="google-sheets">
  {#if error}
    <p class:error>{error}</p>
  {/if}
  <InputField
    label="Google Sheets URL"
    id="googleSheetsURL"
    bind:value={googleSheetsURL}
    fullWidth={true} />
  <button
    class="button button--primary button--shadow quick-start__submit"
    type="button"
    on:click={handleClientLoad}>Read Values</button>
</div>
