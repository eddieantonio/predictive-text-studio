import { createZipWithFiles } from "./generate-zip";

/**
 * Give file information and create a kmp file for the dictionary
 * 
 * Format of the lexical model file: {model_id}.model.js
 * the compiled code generated by the @predictive-text-studio/lexical-model-compiler
 * 
 * @param modelName 
 * @param compiledModelCode 
 * @param modelInfo 
 */
export async function generateKmp(modelName: string, compiledModelCode: string, modelInfo: string): Promise<ArrayBuffer> {
    let kmpFile = createZipWithFiles({
        modelName: compiledModelCode,
        "kmp.json": modelInfo
    })
    return kmpFile;
}

