import Dexie, { DexieOptions } from "dexie";
import { WordList } from "@common/types";
import { StoredWordList, KeyboardData, StoredProjectData } from "./models";
const DB_NAME = "dictionary_sources";
const SCHEMA_VERSION = 3;

/**
 * The key of the ONLY StoredPackageInfo record.
 */
const PACKAGE_ID = 0;

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredWordList, number>;
  projectData: Dexie.Table<StoredProjectData, number>;
  keyboardData: Dexie.Table<KeyboardData, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(SCHEMA_VERSION).stores({
      /**
       * files Table Schema:
       *
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | name             |
       * +------------------+
       * | wordlist         |
       * +------------------+
       */
      files: "++id, name, wordlist",

      /**
       * projectData Table Schema:
       *
       * projectData stores optional and required metadata such as BCP-47,
       * language name, author name, copyright string, etc.
       *
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | langName         |
       * +------------------+
       * | bcp47Tag         |
       * +------------------+
       * | authorName       |
       * +------------------+
       * | modelID          |
       * +------------------+
       * | copyright        |
       * +------------------+
       * | version          |
       * +------------------+
       */
      projectData:
        "++id, langName, bcp47Tag, authorName, modelID, copyright, version",
      /**
       * KMP keyboardData Table Scehma
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * +------------------+
       * | bcp47Tag         |
       * +------------------+
       * | language         |
       * +------------------+
       */
      keyboardData: "++id, bcp47Tag, langauge",
    });

    /* The assignments are not required by the runtime, however, they are
     * necessary for proper type-checking. */
    this.files = this.table("files");
    this.projectData = this.table("projectData");
    this.keyboardData = this.table("keyboardData");
  }
}

/**
 * Single access point to store and retrieve persistent data in the
 * Predictive Text Studio application.
 */
export default class Storage {
  private db: PredictiveTextStudioDexie;

  constructor(db?: PredictiveTextStudioDexie) {
    this.db = db || new PredictiveTextStudioDexie();
  }

  /**
   * Saves a wordlist source file to storage.
   */
  saveFile(name: string, wordlist: WordList): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where("name").equals(name).delete();
      await this.db.files.put({ name, wordlist });
    });
  }

  /**
   * Retrieves every file in the database as a list of {name, contents}
   * objects.
   */
  fetchAllFiles(): Promise<StoredWordList[]> {
    return this.db.files.toArray();
  }

  /**
   * Update BCP-47 tag to database
   */
  updateBCP47Tag(bcp47Tag: string): Promise<void> {
    return this.db.transaction("readwrite", this.db.projectData, async () => {
      const currentData = (await this.db.projectData.get({
        id: PACKAGE_ID,
      })) || { langName: "", bcp47Tag, authorName: "", id: PACKAGE_ID };
      currentData.bcp47Tag = bcp47Tag;
      await this.db.projectData.put(currentData);
    });
  }

  /**
   * Update required and some optional metadata to database
   */
  updateProjectData(metadata: { [key: string]: string }): Promise<void> {
    return this.db.transaction("readwrite", this.db.projectData, async () => {
      await this.db.projectData.put({
        langName: metadata.langName,
        bcp47Tag: metadata.bcp47Tag,
        authorName: metadata.authorName,
        modelID: metadata.modelID,
        copyright: metadata.copyright,
        version: metadata.version,
        id: PACKAGE_ID,
      });
    });
  }

  /**
   * Retrieves the current project data.
   */
  async fetchProjectData(): Promise<StoredProjectData> {
    const projectData = await this.db.projectData
      .where(":id")
      .equals(PACKAGE_ID)
      .first();

    if (projectData == undefined) {
      throw new Error("No project data has been stored");
    }

    return projectData;
  }

  /**
   * Save all keyboard info into the database
   */
  addKeyboardData(langauge: string, bcp47: string): Promise<void> {
    return this.db.transaction("readwrite", this.db.keyboardData, async () => {
      await this.db.keyboardData.put({ langauge, bcp47Tag: bcp47 });
    });
  }

  /**
   * Retrieves every keyboard data in the database as a list of {language, bcp47Tag}
   */
  fetchKeyboardData(): Promise<KeyboardData[]> {
    return this.db.keyboardData.toArray();
  }
}
