/**
 * Pairs a word with its absolute frequency (count) in a corpus.
 */
export type WordAndCount = [string, number];

/**
 * An array of word counts.
 *
 * Ideally, this array should have **unique** members, and there is no
 * significance to the order of the members, however, this is not enforced by
 * the type.
 */
export type WordList = WordAndCount[];
