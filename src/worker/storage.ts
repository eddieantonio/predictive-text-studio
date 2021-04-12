import Dexie, { DexieOptions, PromiseExtended } from "dexie";
import { StoredProjectData, StoredWordList } from "@common/types";
import {
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

    /* Version 5: Add "size" property to file table: */
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

    /* Version 6: Convert the `langName` property to `language` in the project table */
    this.version(6)
      .stores({
        projectData:
          "++id, language, bcp47Tag, authorName, modelID, copyright, dictionaryName, version",
      })
      .upgrade((transaction) => {
        return transaction
          .table("projectData")
          .toCollection()
          .modify((project) => {
            project.language = project.langName;
            delete project.langName;
          });
      });

    this.version(7).stores({
      files: "++id, name, wordlist, size, project",
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
  deleteFile(name: string, project: number): Promise<void> {
    return this.db.transaction("readwrite", this.db.files, async () => {
      await this.db.files.where({ name, project }).delete();
    });
  }

  fetchAllFiles(): Promise<StoredWordList[]> {
    return this.db.files.toArray();
  }

  /**
   * Retrieves every file in the database as a list of {name, contents}
   * objects. Sorts the files by name.
   */
  fetchFiles(project = 1): Promise<StoredWordList[]> {
    return this.db.files.where("project").equals(project).sortBy("name");
  }

  /**
   * Update BCP-47 tag to database
   */
  updateBCP47Tag(bcp47Tag: string, project?: number): Promise<number> {
    return this.putProjectData({ bcp47Tag }, project);
  }

  createProjectData(): PromiseExtended<number> {
    return this.db.projectData.put({
      authorName: "Unknown Author",
      // An empty string indicates "lanugage unknown" in XML/HTML as in <html lang="">
      // See: https://www.w3.org/International/questions/qa-no-language#undetermined
      // See: https://tools.ietf.org/html/bcp47#section-3.4.1
      bcp47Tag: "",
      language: "Unknown Language",
    });
  }

  /**
   * Update required and some optional metadata to database
   */
  putProjectData(
    metadata: { [key: string]: string },
    project?: number
  ): Promise<number> {
    return this.db.transaction("readwrite", this.db.projectData, async () => {
      const projectId = project ?? (await this.createProjectData());
      const projectData = await this.fetchProjectData(projectId);
      await this.db.projectData.put({
        ...projectData,
        ...metadata,
      } as StoredProjectData);
      return projectId;
    });
  }

  /**
   * Delete project data
   */
  deleteProjectData(project: number | undefined): PromiseExtended<void> {
    return this.db.projectData.delete(project);
  }

  /**
   * Checks if a project currently exists
   */
  async doesProjectExist(): Promise<boolean> {
    try {
      const count = await this.db.projectData.count();
      return count > 0;
    } catch (err) {
      // No project data found
      return false;
    }
  }

  /**
   * Retrieves all project data.
   */
  async fetchAllProjectData(): Promise<StoredProjectData[]> {
    return this.db.projectData.toArray();
  }

  /**
   * Retrieves the current project data.
   */
  async fetchProjectData(project = 1): Promise<StoredProjectData> {
    const projectData = await this.db.projectData.get(project);

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
    const projectData: StoredProjectData[] = await this.fetchAllProjectData();
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
        await this.db.projectData.bulkPut(projectData);
      });
    }
    if (files) {
      await this.db.transaction("readwrite", this.db.files, async () => {
        await this.db.files.bulkPut(files);
      });
    }
  }
}
