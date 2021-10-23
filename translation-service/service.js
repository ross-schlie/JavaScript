/// <reference path="./global.d.ts" />
// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.

import { AbusiveClientError, NotAvailable, Untranslatable } from './errors';

export class TranslationService {

  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text) {
    const response = this.api.fetch(text);
    return new Promise(function (resolve, reject) {
      response
      .then(function (response) {
        resolve(response.translation);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }

  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
  batch(texts) {
    const responses = [];
    for (let i = 0; i < texts.length; i++) {
      responses[i] = this.api.fetch(texts[i]);
    }

    return new Promise(function (resolve, reject) {
      if (texts.length === 0) {
        reject(new BatchIsEmpty())
      }

      let textsTranslated = 0;
      const batchPromise = new Promise(function(batchResolve, batchReject) {
        setTimeout(function() {
          if (textsTranslated == texts.length) {
            batchResolve(true)
          }
          // else loop?
        }, 300);
      });

      for (let i = 0; i < texts.length; i++) {
        responses[i]
        .then(function(response) {
          textsTranslated++
          texts[i] = response.translation;
        })
        .catch(function (err) {
          reject(err);
        });
      }

      batchPromise.then(function (action) {
        resolve(texts);
      });
    });
  }

  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * - If `api.request` does not return an error, resolve with `undefined`
   * - If `api.request` returns an error, retry at most two times
   * - If you're out of retires, reject with the last error received
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  request(text) {
    const api = this.api;
    let attempts = 1;
    let error;
    let success;

    const requestCallback = function(response) {
      if (response instanceof Error) {
        attempts++;
        error = response;
        if (attempts <= 3) {
          initiateRequest();
        }
      } else {
        success = true
      }
    };

    const initiateRequest = function() {
      api.request(text, requestCallback);
    };

    initiateRequest();

    return new Promise(function (resolve, reject) {
      setTimeout(function() {
        if (success) {
          resolve();
        }

        if (attempts > 3) {
          reject(error);
        }
      }, 500);
    });
  }

  /**
   * Retrieves the translation for the given text
   *
   * - If `api.fetch` resolves, check the quality before resolving
   * - If `api.fetch` rejects with `NotAvailable`, _request_ the translation instead
   * - If `api.fetch` rejects with `Untranslatable`, forward the error
   * - If _requesting_ rejects, forward the error

   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
  premium(text, minimumQuality) {
    const api = this.api;

    const makeRequest = this.request.bind(this);
    const response = api.fetch(text);
    return new Promise(function (resolve, reject) {
      response
      .then(function (response) {
        if (response.quality >= minimumQuality) {
          resolve(response.translation);
        } else {
          reject(new QualityThresholdNotMet(text));
        }
      })
      .catch(function (err) {
        if (err instanceof NotAvailable) {
          const fallBackRequest = makeRequest(text);
          fallBackRequest
          .then(function() {
            api.fetch(text)
            .then(function (response) {
              if (response.quality >= minimumQuality) {
                resolve(response.translation);
              } else {
                reject(new QualityThresholdNotMet(text));
              }
            })
            .catch(function (err) {
              reject(err);
            });
          })
          .catch(function(error) {
            reject(error);
          });
        } else { // instanceof Untranslatable
          reject(err);
        }
      });
    });
  }
}

/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
export class QualityThresholdNotMet extends Error {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(
      `
The translation of ${text} does not meet the requested quality threshold.
    `.trim()
    );

    this.text = text;
  }
}

/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `
Requested a batch translation, but there are no texts in the batch.
    `.trim()
    );
  }
}
