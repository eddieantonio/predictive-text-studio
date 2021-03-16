import { logError } from "@common/logging";

/**
 * Maps a decimal representation of a spreadsheet column to an letter one
 * @param columnDecimal the decimal representation of the column
 * @returns the alphabetical representation of a column (e.g. 'AA')
 */
export function mapDecToColLetters(columnDecimal: number): string {
  if (columnDecimal < 0) {
    logError(new Error("You cannot pass in negative values!"));
  }

  let dividend = columnDecimal + 1;
  let colLetters = "";
  let modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    colLetters = String.fromCharCode(65 + modulo).toString() + colLetters;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  if (colLetters.length == 0) {
    logError(
      new Error("No letters could be generated from the given column decimal!")
    );
  }

  return colLetters;
}

/**
 * Maps a letter representation of a spreadsheet column to a decimal one
 * Is only exported for testing.
 * Developers should favor using `getColIndexFromString` over this function.
 * @param columnLetters the letter representation of the column
 * @returns the decimal representation of a column (e.g. 2)
 */
export function mapColLettersToDec(columnLetters: string): number {
  if (columnLetters === "") {
    logError(new Error("Cannot pass in an empty string!"));
  }
  return (
    columnLetters.split("").reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) -
    1
  );
}

/**
 * Takes a series of column letters and attempts to convert it into a decimal.
 * @param inputColLetters A series of letters for the column. Expected to be user-inputted
 * @param defaultColValue The default value a column should be if the input is bad
 * @returns the decimal version of the column if the input is valid, returns the default value otherwise
 */
export function getColIndexFromString(
  inputColLetters: string,
  defaultColValue: number
): number {
  if (inputColLetters === "") {
    return defaultColValue;
  } else {
    return mapColLettersToDec(inputColLetters);
  }
}
