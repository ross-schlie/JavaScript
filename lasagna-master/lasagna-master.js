/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

/**
 * Check the status of the Lasagna in the over.
 *
 * - If the timer shows `0`, it should return 'Lasagna is done.'.
 * - If the timer shows any other number, the result should be 'Not done, please wait.'.
 * - If the function is called without a timer value, the result should be 'You forgot to set the timer.'.
 * The timer will never show a value below 0.
 *
 * @param {number} remainingTime the remaining time on the timer in minutes
 * @returns {string} status of the Lasagna
 */
export function cookingStatus(remainingTime) {
    let status = 'Not done, please wait.';
    if (remainingTime === undefined) {
        status = 'You forgot to set the timer.'
    } else if (remainingTime === 0) {
        status = 'Lasagna is done.'
    }

    return status;
}

/**
 * Estimate how long the preparation will take.
 *
 * If the function is called without providing the average preparation time, 2 minutes should be assumed instead.
 *
 * @param {string[]} layers list of ingredients to prepare.
 * @param {number} prepTime, the average preparation time per layer in minutes
 * @returns {number} the estimated time needed to prepare the lasagna.
 */
export function preparationTime(layers, prepTime = 2) {
    return layers.length * prepTime;
}

/**
 * Determine the quantity of noodles and sauce needed to make your meal.
 *
 * @param {string[]} layers list of ingredients to prepare.
 * @returns {Object} the quantity of noodles and sauce needed to make your meal.
 */
export function quantities(layers) {
    const NOODLES_PER_LAYER = 50;
    const SAUCE_PER_LAYER = 0.2;

    let noodleLayers = layers.filter((value) => { return value == 'noodles' });
    let sauceLayers = layers.filter((value) => { return value == 'sauce' });
    return { 'noodles': noodleLayers.length * NOODLES_PER_LAYER, 'sauce': sauceLayers.length * SAUCE_PER_LAYER };
}

/**
 * Add the last item from your friends list ingredient list to my list of ingredients.
 *
 * @param {string[]} otherIngredients list your friend sent you.
 * @param {string[]} myIngredients the ingredient list for your own recipe.
 */
export function addSecretIngredient(otherIngredients, myIngredients) {
    myIngredients.push(otherIngredients[otherIngredients.length - 1]);
}

/**
 * Make a recipe with the amounts needed for the desired number of portions.
 *
 * You want to keep the original recipe though.
 * This means, in this task the recipe argument should not be modified.
 *
 * @param {object} recipe A recipe object that holds the amounts needed for 2 portions.
 * @param {number} portions number of portions you want to cook.
 * @returns {object} a recipe object with the amounts needed for the desired number of portions.
 */
export function scaleRecipe(recipe, portions) {
    let adjustPortions = function(ingredient, portions) {
        return (ingredient / 2) * portions;
    }

    const scaledRecipe = {}
    for (let ingredient in recipe) {
        scaledRecipe[ingredient] = adjustPortions(recipe[ingredient], portions);
    }

    return scaledRecipe;
}
