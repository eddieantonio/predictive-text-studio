import test from "ava";
import * as fs from "fs";
import * as path from "path";
import * as dot from "dotenv";
import * as c from "chalk";
import { google } from "googleapis";
import { readGoogleSheet } from "@worker/read-wordlist";
import { pathToFixture } from "./helpers";
import type { GlobalOptions } from "googleapis-common";

dot.config({ path: path.join(__dirname, "../.env") });
const error = c.bold.red;

////////////////////////////////// Globals ///////////////////////////////////

// "Hello" in various languages spreadsheet: https://docs.google.com/spreadsheets/d/1gShmGH6BJWyAVl8org7G_Wom8XdOYe59bK7tgtjTtJo
const SPREADSHEET_ID =
  process.env.GOOGLESHEETS_ID || "1gShmGH6BJWyAVl8org7G_Wom8XdOYe59bK7tgtjTtJo";

// https://developers.google.com/sheets/api/quickstart/nodejs#step_2_install_the_client_library
// Authorization scopes required by the API.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens.
const TOKEN_PATH = pathToFixture("token.json");

/////////////////////////////////// Types ////////////////////////////////////

type Auth = GlobalOptions["auth"];

/**
 * Credentials needed to login to the Google OAuth2 API.
 */
interface Credentials {
  readonly client_secret: string;
  readonly client_id: string;
  readonly redirect_uri: string;
}

type OnAuthorized = (auth: Auth) => unknown;

/**
 * XXX: the Google APIs are gross, so we cast to this constructed type.
 * Here are the actual types that things are based on:
 *
 * google.sheets().spreadsheets.values.get(): https://github.com/googleapis/google-api-nodejs-client/blob/97ce2eb592e34f85337578efdb2a5a87c1bb49a3/src/apis/sheets/v4.ts#L7301-L7403
 * BodyResponseCallback: https://github.com/googleapis/nodejs-googleapis-common/blob/65717e6262b0a95d0346ff1f6b9d415d6d7de641/src/api.ts#L78-L81
 * GaxiosResponse: https://github.com/googleapis/gaxios/blob/df1d21c9ff31b1de74f9c73143550bba557e0718/src/common.ts#L45-L52
 * Schema$ValueRange: https://github.com/googleapis/google-api-nodejs-client/blob/97ce2eb592e34f85337578efdb2a5a87c1bb49a3/src/apis/sheets/v4.ts#L4788-L4801
 */
type SheetsResponse = { data: { values: string[][] | null } };

////////////////////////////////// Helpers ///////////////////////////////////

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: Credentials, callback: OnAuthorized) {
  const { client_secret, client_id, redirect_uri } = credentials;
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

  // Read access token from JSON file.
  fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err, token: string) => {
    if (err) {
      const authURL = auth.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      console.error(
        error(
          `${TOKEN_PATH} is missing: \nAuthorize this app by visiting ${authURL}.\n\n`
        ),
        "Follow the instruction on https://github.com/eddieantonio/predictive-text-studio/blob/production/.github/CONTRIBUTING.md#set-up-your-google-sheets-api-key\n\n"
      );
    } else {
      auth.setCredentials(JSON.parse(token));
      callback(auth);
    }
  });
}

/**
 * Gets an enviroment variable, but throws an error if it's undefined.
 */
function getEnvOrError(name: string): string {
  const env = process.env[name];
  if (env === undefined) {
    throw new Error(
      `Did not find ${name} in environment. Did you forget to define it in the .env file?`
    );
  }
  return env;
}

/////////////////////////////////// Tests ////////////////////////////////////

test.cb("it should fetch wordlist from Google Sheets API", (t) => {
  authorize(
    {
      client_secret: getEnvOrError("CLIENT_SECRET"),
      client_id: getEnvOrError("CLIENT_ID"),
      redirect_uri: process.env.REDIRECT_URI || "http://localhost:5000",
    },
    (auth: Auth) => {
      const sheets = google.sheets({ version: "v4", auth });
      const spreadsheetId = SPREADSHEET_ID;
      sheets.spreadsheets.values.get(
        {
          spreadsheetId,
          range: "A1:B",
        },
        async (err, res: unknown) => {
          if (err) {
            t.fail(err.message);
          } else {
            const rows = (res as SheetsResponse).data.values;
            if (rows === null) {
              t.fail("Did not expect rows to be null!");
              return;
            }

            t.not(rows.length, 0);
            const { name, wordlist, size, type } = await readGoogleSheet(
              spreadsheetId,
              rows
            );
            t.is(name, spreadsheetId);
            // this will probably show up poorly in your editor:
            const MARHABAAN = "مرحبا";
            const TANSI = "ᑖᓂᓯ";
            t.deepEqual(wordlist, [
              ["hola", 586_000_000],
              [MARHABAAN, 310_000_000],
              [TANSI, 34_000],
              ["ÍY SȻÁĆEL", 5],
            ]);
            t.is(size, 4);
            t.is(type, "google-sheets");
          }
          t.end();
        }
      );
    }
  );
});
