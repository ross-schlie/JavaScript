// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
  return Number.parseInt(array1.join("")) + Number.parseInt(array2.join(""));
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean}  whether the number is a palindrome or not
 */
export function luckyNumber(value) {
  let numberValue = value.toString().split("");
  let middle = Math.floor(numberValue.length / 2);
  let tail = numberValue.length - 1;
  for (let i = 0; i <= middle; i++) {
    if (numberValue[i] != numberValue[tail - i]) {
      return false;
    }
  }

  return true;
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * - If the user types something into a field, the associated value is always a string even if the user only typed in numbers.
 * - If the user types something but deletes it again, the variable will be an empty string.
 * - Before the user even started typing, the variable can be `undefined` or `null`.
 *
 * If the user did not provide any input, `errorMessage` should return `'Required field'`.
 * If the input does not represent a non-zero number (according to the JavaScript conversion rules), `'Must be a number besides 0'` should be returned.
 * In all other cases you can assume the input is valid, the return value should be an empty string.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
  let errorMessage = "";
  if (input === "" || input === undefined || input === null) {
    errorMessage = 'Required field';
  } else {
    let numberValue = Number(input);
    if (numberValue === 0 || Number.isNaN(numberValue)) {
      errorMessage = 'Must be a number besides 0';
    }
  }

  return errorMessage;
}
