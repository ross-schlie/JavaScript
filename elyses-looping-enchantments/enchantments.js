// @ts-check

/**
 * Determine how many cards of a certain type there are in the deck
 *
 * The function should use `forEach` and return the number of cards in the deck that are of a given type.
 *
 * @param {number[]} stack an array of cards (Elyse's deck)
 * @param {number} card the card type that should be counted
 *
 * @returns {number} number of cards of a single type there are in the deck
 */
export function cardTypeCheck(stack, card) {
  let count = 0;
  stack.forEach(number => {
    if (number === card) {
      count++;
    }
  });

  return count;
}

/**
 * Determine how many cards are odd or even
 *
 * boolean (true is analogous to 'even', and false is analogous to 'odd')
 * This function should return a single number: the number of odd or even cards there are (depending on the value of the second argument) in the deck.
 * To practice, use a `for...of` loop in the function implementation this time.
 *
 * @param {number[]} stack an array of cards (Elyse's deck)
 * @param {boolean} type the type of value to check for - odd or even
 * @returns {number} number of cards that are either odd or even (depending on `type`)
 */
export function determineOddEvenCards(stack, type) {
  let count = 0;
  for (const card of stack) {
    if ((type && card % 2 === 0) || (!type && card % 2 === 1)) {
      count++;
    }
  }

  return count;
}
