import test from "ava";
import * as fs from "fs";
import * as path from "path";
import * as dot from "dotenv";
import { google } from "googleapis";
import { readGoogleSheet } from "@worker/read-wordlist";
import { pathToFixture } from "./helpers";

dot.config({ path: path.join(__dirname, "../.env") });

// https://developers.google.com/sheets/api/quickstart/nodejs#step_2_install_the_client_library
// Authorization scopes required by the API.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens.
const TOKEN_PATH = pathToFixture("token.json");

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
  const { client_secret, client_id, redirect_uri } = credentials;
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  // Read access token from JSON file.
  fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err: any, token: string) => {
    if (err) {
      const authURL = auth.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      console.error(
        `${TOKEN_PATH} is missing: Authorize this app by visiting ${authURL}.`,
        "Follow the instruction on https://github.com/eddieantonio/predictive-text-studio/blob/production/.github/CONTRIBUTING.md"
      );
    } else {
      auth.setCredentials(JSON.parse(token));
      callback(auth);
    }
  });
}

test.cb("it should fetch wordlist from Google Sheets API", (t) => {
  try {
    authorize(
      {
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
      },
      (auth: any) => {
        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLESHEETS_ID || "";
        sheets.spreadsheets.values.get(
          {
            spreadsheetId,
            range: "A1:B",
          },
          async (err, res: any) => {
            if (err) throw err;
            const rows = res.data.values;
            t.not(rows.length, 0);
            const { name, wordlist, size, type } = await readGoogleSheet(
              spreadsheetId,
              rows
            );
            t.is(name, spreadsheetId);
            t.deepEqual(wordlist, [
              ["hello", 1],
              ["world", 2],
            ]);
            t.is(size, 2);
            t.is(type, "google-sheets");
            t.end();
          }
        );
      }
    );
  } catch (err) {
    return t.fail(err.message);
  }
});
