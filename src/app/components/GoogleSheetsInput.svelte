<script>
  import worker from "../spawn-worker";

  import InputField from "./InputField.svelte";
  import Button from "./Button.svelte";

  var error = null;
  let googleSheetsURL = "";

  // Client ID and API key from the Developer Console
  const CLIENT_ID = process.env.G_CLIENT_ID;
  const API_KEY = process.env.G_API_KEY;

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
      .catch(() => {
        error = "Error: Could not connect to Google Sheets";
      });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      getValuesFromSpreadSheet();
    } else {
      handleAuthClick();
      getValuesFromSpreadSheet();
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function signInToGoogleAPI(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   * Gets the unique spreadsheet ID from a Google Sheet URL
   *
   */
  function getSpreadsheetId() {
    googleSheetsURL = document.getElementById("googleSheetsURL").value;
    if (googleSheetsURL) {
      return googleSheetsURL.split("/")[5];
    } else {
      error = `Error: The url ${googleSheetsURL} is not a valid Google Sheets URl. Please paste a valid one.`;
    }
  }

  /**
   * Read word and count form storage
   * Sample: https://docs.google.com/spreadsheets/d/1lzHxoMWHpdGecby4d0y15AVf80csA7iNkaMMEL54Q7g/edit#gid=0
   */
  async function getValuesFromSpreadSheet() {
    const wordListObject = [];
    let spreadsheetId = getSpreadsheetId() || "";

    if (error) {
      return error;
    }

    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: "A2:B",
      })
      .then(
        async function (response) {
          var range = response.result;
          if (range.values.length > 0) {
            for (let i = 0; i < range.values.length; i++) {
              let row = range.values[i];
              let word = row[0];
              let wordCount = row[1];
              if (!wordCount) {
                wordCount = 0;
              }
              wordListObject.push([word, wordCount]);
            }
            error = null;

            await worker.readGoogleSheet(spreadsheetId, wordListObject);
          } else {
            error = "Error: No data found in the Google Sheet.";
          }
        },
        function (response) {
          error = "Error: " + response.result.error.message;
        }
      );
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
    padding: 5px 10px;
  }
</style>

<div class="google-sheets">
  {#if error}
    <p class:error>{error}</p>
  {/if}
  <h2>Or Get Values from a Google Sheet</h2>
  <InputField
    label="Google Sheets URL"
    id="googleSheetsURL"
    bind:value={googleSheetsURL}
    fullWidth={true} />
  <Button color="blue" onClick={handleClientLoad}>Read Values</Button>
</div>
<svelte:head>
  <script async defer src="https://apis.google.com/js/api.js">
  </script>
</svelte:head>
