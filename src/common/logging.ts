declare const DEVELOPMENT: boolean;

let hasNotifiedDev = false;

/**
 * Log an error in development mode.
 * Will warn if the .env file doesn't have DEVELOPEMENT equal to 'true'.
 *
 * Should be used to warn that something went wrong.
 *
 * @param e the error object to include. A message can be included in the object.
 */
function logError(e: Error): void {
  if (DEVELOPMENT) {
    if (!hasNotifiedDev) {
      // Message to notify dev that logging is enabled
      console.warn("Developer Logging Is Enabled");
      hasNotifiedDev = true;
    }
    console.error(e);
  }
}

export { logError };
