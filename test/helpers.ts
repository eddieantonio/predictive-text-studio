import * as path from "path";

/**
 * Returns an abolute path to the given fixture.
 */
export function pathToFixture(...pathArgs: string[]): string {
  return path.join(__dirname, "fixtures", ...pathArgs);
}
