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
