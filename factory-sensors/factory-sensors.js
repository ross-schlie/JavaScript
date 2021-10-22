// @ts-check

export class ArgumentError extends Error {}

export class OverheatingError extends Error {
  constructor(temperature) {
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

/**
 * Check if the humidity level is not too high.
 *
 * You should throw an error (the message is not important) if the percentage exceeds 70%.
 *
 * @param {number} humidityPercentage
 * @throws {Error}
 */
export function checkHumidityLevel(humidityPercentage) {
  if (humidityPercentage > 70) {
    throw new Error('Humidity over 70%');
  }
}

/**
 * Check if the temperature is not too high.
 *
 * - If the sensor is broken, the temperature will be `null`.
 * In this case you should throw an `ArgumentError`.
 * - When everything works, if the temperature exceeds 500°C, you should throw a `OverheatingError`.
 * This error class will be instantiated with a temperature argument.
 * Make sure that the `OverheatingError` you throw has a temperature property attached to it.
 *
 * @param {number|null} temperature
 * @throws {ArgumentError|OverheatingError}
 */
export function reportOverheating(temperature) {
  const OVERHEATING_THRESHOLD = 500;
  if (temperature === null) {
    throw new ArgumentError("Sensor is broken");
  } else if (temperature > OVERHEATING_THRESHOLD) {
    throw new OverheatingError(temperature);
  }
}

/**
 *  Triggers the needed action depending on the result of the machine check.
 *
 * - If the sensor is broken, you need to warn a technician
 * - If the temperature is too high, you will either shutdown the machine if the temperature exceeds 600°C or turn on a warning light if it is less than that.
 * - If another error happens, you'll rethrow it.
 *
 * @param {{
 * check: function,
 * alertDeadSensor: function,
 * alertOverheating: function,
 * shutdown: function
 * }} actions
 * @throws {ArgumentError|OverheatingError|Error}
 */
export function monitorTheMachine(actions) {
  try {
    actions.check();
  } catch (error) {
    if (error instanceof ArgumentError) {
      actions.alertDeadSensor();
    } else if (error instanceof OverheatingError) {
      const SHUTDOWN_THRESHOLD = 600;
      if (error.temperature > SHUTDOWN_THRESHOLD) {
        actions.shutdown();
      } else {
        actions.alertOverheating();
      }
    } else {
      throw error;
    }
  }
}
