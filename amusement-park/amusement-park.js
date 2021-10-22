/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Creates a new visitor.
 *
 * @param {string} name
 * @param {number} age
 * @param {string} ticketId
 * @returns {Visitor} the visitor that was created
 */
export function createVisitor(name, age, ticketId) {
  const visitor = {
    "name": name,
    "age": age,
    "ticketId": ticketId,
  };

  return visitor;
}

/**
 * Revokes a ticket for a visitor.
 *
 * @param {Visitor} visitor the visitor with an active ticket
 * @returns {Visitor} the visitor without a ticket
 */
export function revokeTicket(visitor) {
  visitor.ticketId = null;
  return visitor;
}

/**
 * Determines the status a ticket has in the ticket tracking object.
 *
 * 'unknown ticket id' if the identifier was not found in the tracking object
 * 'not sold' in case the ticket was printed but not sold
 * 'sold to {name}' where {name} is the name of the visitor if the ticket was sold
 *
 * @param {Record<string, string|null>} tickets
 * @param {string} ticketId
 * @returns {string} ticket status
 */
export function ticketStatus(tickets, ticketId) {
  let status = null;
  if (tickets[ticketId] === undefined) {
    status = 'unknown ticket id';
  } else if (tickets[ticketId] === null) {
    status = 'not sold';
  } else {
    status = "sold to " + tickets[ticketId];
  }

  return status;
}

/**
 * Determines the status a ticket has in the ticket tracking object
 * and returns a simplified status message.
 *
 * the name of the visitor if the ticket was sold
 * 'invalid ticket !!!' if the ticket was not sold yet or the identifier was not found in the tracking object
 *
 * @param {Record<string, string|null>} tickets
 * @param {string} ticketId
 * @returns {string} ticket status
 */
export function simpleTicketStatus(tickets, ticketId) {
  return tickets[ticketId] ?? 'invalid ticket !!!';
}

/**
 * Determines the version of the GTC that was signed by the visitor.
 *
 * @param {VisitorWithGtc} visitor
 * @returns {string | undefined} version
 */
export function gtcVersion(visitor) {
  return visitor.gtc?.version;
}
