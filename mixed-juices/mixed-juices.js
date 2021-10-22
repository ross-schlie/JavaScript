// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  // 'Pure Strawberry Joy' takes 0.5 minutes,
  // 'Energizer' and 'Green Garden' take 1.5 minutes each,
  // 'Tropical Island' takes 3 minutes
  // and 'All or Nothing' takes 5 minutes.
  // For all other drinks (e.g., special offers) you can assume a preparation time of 2.5 minutes.
  let prepTime = 2.5;
  switch(name) {
    case 'Pure Strawberry Joy':
      prepTime = 0.5;
      break;
    case 'Energizer':
    case 'Green Garden':
      prepTime = 1.5;
      break;
    case 'Tropical Island':
      prepTime = 3;
      break;
    case 'All or Nothing':
      prepTime = 5;
      break;
  }

  return prepTime;
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
  // She can get 6 wedges from a 'small' lime, 8 wedges from a 'medium' lime and 10 from a 'large' lime.
  // She always cuts the limes in the order in which they appear in the list, starting with the first item.
  // She keeps going until she reached the number of wedges that she needs or until she runs out of limes.
  let limesCut = 0;
  let lime;
  while(limes.length > 0) {
    if (wedgesNeeded <= 0) {
      break;
    }

    lime = limes.shift();
    limesCut++;
    switch(lime) {
      case 'small':
        wedgesNeeded -= 6;
        break;
      case 'medium':
        wedgesNeeded -= 8;
        break;
      case 'large':
        wedgesNeeded -= 10;
        break;
    }
  }

  return limesCut;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  // The time left in the shift will always be greater than 0.
  // Furthermore the orders are prepared in the order in which they appear in the array.
  // If Li Mei starts to mix a certain juice, she will always finish it even if she has to work a bit longer.
  let juiceName = '';
  while (timeLeft > 0) {
    if (orders.length === 0) {
      break;
    }

    juiceName = orders.shift();
    timeLeft -= timeToMixJuice(juiceName);
  }

  return orders;
}
