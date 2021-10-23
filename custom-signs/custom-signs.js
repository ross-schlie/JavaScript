// @ts-check

// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Build a sign that includes both of the parameters.
 *
 * @param {string} occasion
 * @param {string} name
 *
 * @returns {string} template string combining both parameters
 */

export function buildSign(occasion, name) {
  return `Happy ${occasion} ${name}!`;
}

/**
 * Build a birthday sign that conditionally formats the return string.
 *
 * If the age is 50 or older, the sign will include the word _old_, otherwise the sign will include the word _young_.
 *
 * @param {number} age
 *
 * @returns {string} template string based on age
 */

export function buildBirthdaySign(age) {
  return `Happy Birthday! What a ${age >= 50 ? 'old' : 'young'} fellow you are.`
}

/**
 * Build a graduation sign that includes multiple lines.
 *
 * @param {string} name
 * @param {number} year
 *
 * @returns {string} multi-line template string
 */

export function graduationFor(name, year) {
  return `Congratulations ${name}\nClass of ${year}`
}

/**
 * Determine cost based on each character of sign parameter that builds
 * the template string that includes the currency parameter.
 *
 * The sign has a base price of 20 in the given currency.
 * Additionally each letter costs 2. (Whitespaces are included in the calculation.)
 * The phrase returned includes the cost to create the sign,
 * written with two digits after the decimal point,
 * followed by the currency string.
 *
 * @param {string} sign
 * @param {string} currency
 *
 * @returns {string} cost to create the sign
 */

export function costOf(sign, currency) {
  return `Your sign costs ${(20 + (sign.length * 2)).toFixed(2)} ${currency}.`
}
