import Dexie, { DexieOptions } from "dexie";
import { WordList } from "@common/types";

const DB_NAME = "dictionary_sources";
const SCHEMA_VERSION = 3;
/**
 * The key of the ONLY StoredPackageInfo record.
 */
const PACKAGE_ID = 0;

interface StoredFile {
  id?: number;
  name: string;
  contents: ArrayBuffer;
}

/**
 * A word list.
 */
export interface StoredWordList {
  id?: number;
  /**
   * Typically the filename of the uploaded dictionary source.
   */
  name: string;
  /**
   * The actual contents of said file.
   */
  wordlist: WordList;
}
/**
 * The information needed to create a KMP file
 */
export interface StoredProjectData {
  id?: number;
  /**
   * the name of language
   */
  langName: string;
  /**
   * the valid bcp47Tag for the language
   */
  bcp47Tag: string;
  /**
   *
   */
  authorName: string;
  /**
   *
   */
  modelID?: string;
  /**
   *
   */
  copyright?: string;
  /**
   *
   */
  version?: string;
}

export class PredictiveTextStudioDexie extends Dexie {
  files: Dexie.Table<StoredWordList, number>;
  projectData: Dexie.Table<StoredProjectData, number>;

  constructor(options?: DexieOptions) {
    super(DB_NAME, options);
    this.version(SCHEMA_VERSION).stores({
      /**
       * files Table Scehma
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
       * projectData Table Scehma
       * projectData stores optional and required metadata such as BCP-47, language name, author name, copyright string, etc.
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
    });
    this.files = this.table("files");
    this.projectData = this.table("projectData");
  }
}

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
   * Update bcp47 tag to database
   * @param bcp47Tag
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
   * Retrieves packageInfo in the database
   */
  fetchPackageInfo(): Promise<StoredProjectData | undefined> {
    return this.db.projectData.where(":id").equals(PACKAGE_ID).first();
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
}
