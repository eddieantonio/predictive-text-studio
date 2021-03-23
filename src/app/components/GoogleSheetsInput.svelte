<script>
  import { mapDecToColLetters } from "../logic/upload-advanced-settings";

  import worker from "../spawn-worker";
  import InputField from "./InputField.svelte";
  import UploadAdvancedInput from "./UploadAdvancedInput.svelte";

  let error = null;
  let googleSheetsURL = "";

  // The state that determines what columns are to be used on upload
  let wordColInd = 0;
  let countColInd = 1;

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
        gapi.auth2.getAuthInstance().isSignedIn.listen(readGoogleSheet);
        // Handle the initial sign-in state.
        readGoogleSheet(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((e) => {
        error = `Error: Could not connect to Google Sheets: ${e}`;
      });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  async function readGoogleSheet(isSignedIn) {
    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn();
    }
    try {
      // Create a range of the spreadsheet that includes both columns
      const spreadsheetRange = `${mapDecToColLetters(
        Math.min(wordColInd, countColInd)
      )}1:${mapDecToColLetters(Math.max(wordColInd, countColInd))}`;

      const spreadsheetId = getSpreadsheetId(googleSheetsURL) || "";
      const {
        result: { values },
      } = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: spreadsheetRange,
      });
      const settings = {
        wordColInd,
        countColInd,
      };
      worker.readGoogleSheet(spreadsheetId, values, settings);
    } catch (err) {
      error = "Error: " + err.message;
      return;
    }
  }

  /**
   * Gets the unique spreadsheet ID from a Google Sheet URL
   */
  function getSpreadsheetId() {
    const googleSheetRegExp = RegExp(
      "http(s?)://docs.google.com/spreadsheets/[a-z]/[\\w-]+/[\\w#=-]+"
    );

    if (googleSheetRegExp.test(googleSheetsURL)) {
      return googleSheetsURL.split("/")[5];
    } else {
      error = `Error: The url ${googleSheetsURL} is not a valid Google Sheets URl. Please paste a valid one.`;
    }
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

<UploadAdvancedInput bind:wordColInd bind:countColInd />
<div class="google-sheets" data-cy="google-sheets-input">
  {#if error}
    <p class:error>{error}</p>
  {/if}
  <InputField
    label="Google Sheets URL"
    id="googleSheetsURL"
    bind:inputValue={googleSheetsURL}
    fullWidth={true} />
  <button
    class="button button--primary button--shadow quick-start__submit"
    type="button"
    on:click={handleClientLoad}>Read Values</button>
</div>
