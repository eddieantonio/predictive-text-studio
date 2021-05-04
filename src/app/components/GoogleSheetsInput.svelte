<script>
  import { _ } from "svelte-i18n";
  import { mapDecToColLetters } from "../logic/upload-advanced-settings";

  import InputField from "./InputField.svelte";

  export let googleSheetsConfig;
  export let googleSheetsURL = "";
  export let error = "";

  // The state that determines what columns are to be used on upload
  export let wordColInd = 0;
  export let countColInd = 1;

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  // Regex pattern for valid Google Sheets URL
  const googleSheetRegExp = RegExp(
    "http(s?)://docs.google.com/spreadsheets/[a-z]/[\\w-]+/[\\w#=-]+"
  );
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
    error = "";
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(saveGoogleSheet);
        // Handle the initial sign-in state.
        saveGoogleSheet(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch((e) => {
        error = `${$_("common.error")}: ${$_("input.connection_error")}: ${e}`;
      });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  async function saveGoogleSheet(isSignedIn) {
    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn();
    }
    try {
      // Create a range of the spreadsheet that includes both columns
      const spreadsheetRange = `${mapDecToColLetters(
        Math.min(wordColInd, countColInd)
      )}1:${mapDecToColLetters(Math.max(wordColInd, countColInd))}`;

      const spreadsheetId = getSpreadsheetId() || "";
      const {
        result: { values },
      } = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: spreadsheetRange,
      });
      const settings = { wordColInd, countColInd };
      googleSheetsConfig = { spreadsheetId, values, settings };
    } catch (err) {
      error = `${$_("common.error")}: ` + err.message;
      return;
    }
  }

  /**
   * Gets the unique spreadsheet ID from a Google Sheet URL
   */
  function getSpreadsheetId() {
    if (googleSheetRegExp.test(googleSheetsURL)) {
      return googleSheetsURL.split("/")[5];
    } else {
      error = `${$_("common.error")}: ${googleSheetsURL} ${$_(
        "input.invalid_google_sheets_url"
      )}`;
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
</style>

<svelte:head>
  <script async defer src="https://apis.google.com/js/api.js">
  </script>
</svelte:head>

<div class="google-sheets" data-cy="google-sheets-input">
  <InputField
    label={`${$_('common.google_sheets')} URL`}
    id="googleSheetsURL"
    bind:inputValue={googleSheetsURL}
    fullWidth={true} />
  <button
    class="button button--primary button--shadow quick-start__submit"
    type="button"
    on:click={handleClientLoad}>{$_('input.read_values')}</button>
</div>
