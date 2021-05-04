import worker from "../spawn-worker";
export async function removeDictionaryFromProject(
  sourceName: string,
  project: number
): Promise<void> {
  await worker.removeDictionaryFromProject(sourceName, project);
}
