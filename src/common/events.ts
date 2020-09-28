export type AppWorkerRequest = SaveFileRequest | CompileModelRequest;

export type AppWorkerResponse = SaveFileResponse | CompileModelResponse;
interface EventPayload {
  errorMessage?: string;
}
export interface SaveFileRequest extends EventPayload {
  type: "save-file";
  name: string;
  file: File;
}

export interface SaveFileResponse extends EventPayload {
  type: "save-file-result";
}

export interface CompileModelRequest extends EventPayload {
  type: "compile-model";
}
export interface CompileModelResponse extends EventPayload {
  type: "compilation-result";
  code?: string;
}
