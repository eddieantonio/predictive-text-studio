declare const DEVELOPMENT: boolean;

let hasWarnedDev: boolean = false;

/**
 * Log an error in development mode.
 * Will warn if the .env file doesn't have DEVELOPEMENT equal to 'true'.
 * 
 * Should be used to warn that something went wrong.
 * 
 * @param e the error object to include. A message can be included in the object.
 */
function logError(e: Error): void{
  if (DEVELOPMENT) {
    console.error(e);
  } else {
    if(!hasWarnedDev){
      // Message warns the dev that logging is disabled
      console.warn('Developer Logging Not Enabled')
      hasWarnedDev = true;
    }
    // Do nothing
  }
}

export {logError};