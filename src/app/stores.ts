/**
 * Svelte stores
 */

import { writable } from "svelte/store";

/**
 * A blob URL for the current project.
 *
 * Set to empty string if no compiled KMP currently exists.
 */
export const currentDownloadURL = writable("");

/**
 * A Boolean value that is set false when KMP compilation begins and set back to true once it completes successfully
 */
export const compileSuccess = writable(true);
