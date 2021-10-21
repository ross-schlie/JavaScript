// @ts-check
//
// ☝🏽 The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion on the web
// and supported IDEs when implementing this exercise. You don't need to
// understand types, JSDoc, or TypeScript in order to complete this JavaScript
// exercise, and can completely ignore this comment block and directive.

import { totalmem } from "os";

// 👋🏽 Hi again!
//
// A quick reminder about exercise stubs:
//
// 💡 You're allowed to completely clear any stub before you get started. Often
// we recommend using the stub, because they are already set-up correctly to
// work with the tests, which you can find in ./freelancer-rates.spec.js.
//
// 💡 You don't need to write JSDoc comment blocks yourself; it is not expected
// in idiomatic JavaScript, but some companies and style-guides do enforce them.
//
// Get those rates calculated!

/**
 * The daily rate is 8 times the hourly rate.
 */
export const HOURS_PER_DAY = 8;

/**
 * A month has 22 billable days.
 */
export const BILLABLE_DAYS_IN_MONTH = 22;

/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
  return ratePerHour * HOURS_PER_DAY;
}

/**
 * Calculates the rate per month
 * The result _must_ be rounded up to the nearest whole number.
 *
 * @param {number} ratePerHour
 * @param {number} discount for example 20% written as 0.2
 * @returns {number} the rounded up monthly rate
 */
export function monthRate(ratePerHour, discount) {
  let monthSubTotal = dayRate(ratePerHour) * BILLABLE_DAYS_IN_MONTH;
  return Math.ceil(applyDiscount(monthSubTotal, discount));
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget the total budget
 * @param {number} ratePerHour the rate per hour
 * @param {number} discount to apply, example 20% written as 0.2
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour, discount) {
  // Note that according to description:
  // If the freelancer bills the project manager per month or more, there is a discount applied.
  // However the tests fail, so disregarding.

  // let days = budget / dayRate(ratePerHour);
  // if (days >= BILLABLE_DAYS_IN_MONTH) {
    let days = 0;
    let monthlyRate = monthRate(ratePerHour, discount);
    let months = Math.floor(budget / monthlyRate);
    days = months * BILLABLE_DAYS_IN_MONTH;

    let remainingBudget = budget % monthlyRate;
    let discountedDailyRate = monthlyRate / BILLABLE_DAYS_IN_MONTH;
    days += remainingBudget / discountedDailyRate;
  // }

  return Math.floor(days);
}

/**
 * Applies a discount to the value
 *
 * @param {number} value
 * @param {number} percentage for example 20% written as 0.2
 * @returns {number} the discounted value
 */
function applyDiscount(value, percentage) {
  let discountedAmount = value * percentage;
  return value - discountedAmount;
}
