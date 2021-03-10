import worker from "../spawn-worker";
export async function removeDictionaryFromProject(
  sourceName: string
): Promise<void> {
  await worker.removeDictionaryFromProject(sourceName);
}
