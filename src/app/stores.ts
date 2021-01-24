/**
 * Svelte stores
 */

import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

/**
 * A blob URL for the current project.
 *
 * Set to null if no compiled KMP currently exists.
 */
export const currentDownloadURL: Writable<string | null> = writable(null);
