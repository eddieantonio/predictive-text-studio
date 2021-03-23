import Dexie, { DexieOptions } from "dexie";
import {
  StoredWordList,
  StoredProjectData,
  KeyboardDataWithTime,
  KMPPackageData,
  ExportedProjectData,
} from "./storage-models";
const DB_NAME = "dictionary_sources";

/**
 * The key of the ONLY StoredPackageInfo record.
 */
const PACKAGE_ID = 0;

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredWordList, number>;
  projectData: Dexie.Table<StoredProjectData, number>;
  keyboardData: Dexie.Table<KeyboardDataWithTime, number>;
  KMPFileData: Dexie.Table<KMPPackageData, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(4).stores({
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
       * | dictionaryName   |
       * +------------------+
       * | version          |
       * +------------------+
       */
      projectData:
        "++id, langName, bcp47Tag, authorName, modelID, copyright, dictionaryName, version",
      /**
       * KMP keyboardData Table Scehma
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | bcp47Tag         |
       * +------------------+
       * | language         |
       * +------------------+
       * | timestamp        |
       * +------------------+
       */
      keyboardData: "++id, bcp47Tag, language, timestamp",
      /**
       * KMP keyboardData Table Scehma
       * +------------------+
       * | id (primary key) |
       * +------------------+
       * | package          |
       * +------------------+
       */
      KMPFileData: "++id, package",
    });

    /* Version 5: Add "size"  property to file table: */
    this.version(5)
      .stores({
        files: "++id, name, wordlist, size",
      })
      .upgrade((transaction) => {
        return transaction
          .table("files")
          .toCollection()
          .modify((file: StoredWordList) => {
            file.size = file.wordlist.length;
          });
      });

    /* The assignments are not required by the runtime, however, they are
     * necessary for proper type-checking. */
    this.files = this.table("files");
    this.projectData = this.table("projectData");
    this.keyboardData = this.table("keyboardData");
    this.KMPFileData = this.table("KMPFileData");
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
  saveFile(file: StoredWordList): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where("name").equals(file.name).delete();
      await this.db.files.put(file);
    });
  }

  /**
   * Deletes a wordlist source file from storage.
   */
  deleteFile(name: string): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where("name").equals(name).delete();
    });
  }

  /**
   * Retrieves every file in the database as a list of {name, contents}
   * objects. Sorts the files by name.
   */
  fetchAllFiles(): Promise<StoredWordList[]> {
    return this.db.files.orderBy("name").toArray();
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
      const existingMetadata:
        | StoredProjectData
        | undefined = await this.db.projectData.get(PACKAGE_ID);
      const updatedMetadata = Object.assign(
        existingMetadata || createInitialProjectData(),
        metadata
      );
      await this.db.projectData.put(updatedMetadata);
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
  addKeyboardData(language: string, bcp47: string): Promise<void> {
    const date = new Date();
    return this.db.transaction("readwrite", this.db.keyboardData, async () => {
      await this.db.keyboardData.put({
        language,
        bcp47Tag: bcp47,
        timestamp: date,
      });
    });
  }

  /**
   * Retrieves every keyboard data in the database as a list of {language, bcp47Tag, KeyboardDataWithTime}
   */
  fetchKeyboardData(): Promise<KeyboardDataWithTime[]> {
    return this.db.keyboardData.toArray();
  }

  /**
   * Delete all keyboard data in the database as a list of {language, bcp47Tag, KeyboardDataWithTime}
   */
  deleteKeyboardData(): Promise<void> {
    return this.db.transaction("readwrite", this.db.keyboardData, async () => {
      await this.db.keyboardData.clear();
    });
  }

  /**
   * Save the KMP package once it compiled
   * @param KMPFile
   */
  saveCompiledKMPAsArrayBuffer(kmpFile: ArrayBuffer): Promise<void> {
    return this.db.transaction("readwrite", this.db.KMPFileData, async () => {
      await this.db.KMPFileData.put({
        package: kmpFile,
        id: PACKAGE_ID,
      });
    });
  }

  /**
   * Retrieve the compiled KMP package from database
   */
  async fetchCompiledKMPFile(): Promise<ArrayBuffer> {
    const kmpFile = await this.db.KMPFileData.where(":id")
      .equals(PACKAGE_ID)
      .first();
    if (kmpFile == undefined) {
      throw new Error("No KMP file has been compiled");
    }
    return kmpFile.package;
  }

  /**
   * Export projectData and Files as a json string
   */
  async exportProjectData(): Promise<string> {
    const projectData: StoredProjectData = await this.fetchProjectData();
    const files: StoredWordList[] = await this.fetchAllFiles();
    return JSON.stringify({ projectData, files });
  }

  /**
   * Import projectData and Files that have previously been exported
   * @param data json string of format: ExportedProjectData
   */
  async importProjectData(data: string): Promise<void> {
    const { projectData, files }: ExportedProjectData = JSON.parse(data);
    if (projectData) {
      await this.db.transaction("readwrite", this.db.projectData, async () => {
        await this.db.projectData.put(projectData);
      });
    }
    if (files) {
      await this.db.transaction("readwrite", this.db.files, async () => {
        await this.db.files.bulkPut(files);
      });
    }
  }
}

function createInitialProjectData(): StoredProjectData {
  return {
    id: PACKAGE_ID,

    authorName: "Unknown Author",

    // An empty string indicates "language unknown" in XML/HTML as in <html lang="">
    // See: https://www.w3.org/International/questions/qa-no-language#undetermined
    // See: https://tools.ietf.org/html/bcp47#section-3.4.1
    bcp47Tag: "",
    langName: "Unknown Language",
  };
}
