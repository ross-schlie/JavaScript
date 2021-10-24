//
// This is only a SKELETON file for the 'Linked List' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

/**
 * Node to hold a value and pointers to the next and previous nodes.
 */
export class Node {

  /**
   *
   * @param {any} value
   * @param {Node | null} previous pointer to next node
   * @param {Node | null} next pointer to previous node
   */
  constructor(value, previous = null, next = null) {
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
}

/**
 * Doubly linked list implementation.
 *
 * List which holds references to the first and last node and
 * offers an array-like interface for adding and removing items:
 * - `push` (_insert value at back_);
 * - `pop` (_remove value at back_);
 * - `shift` (_remove value at front_).
 * - `unshift` (_insert value at front_);
 * Also implement the following interfaces
 * - `delete` (delete the first occurrence of a specified value)
 * - `count` (count the number of items in the list)
 */
export class LinkedList {

  /**
   *
   * @param {Node | null} head
   * @param {Node | null} tail
   */
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  /**
   * Add an element to the end of the linkedlist.
   * _insert value at back_
   *
   * @param {any} value
   */
  push(value) {
    let listNode = new Node(value)
    if (this.tail === null) {
      this.head = listNode;
      this.tail = listNode;
    } else {
      this.tail.next = listNode;
      listNode.previous = this.tail;
      this.tail = listNode;
    }
  }

  /**
   * Remove an element from the end of the linkedlist and return it.
   * _remove value at back_
   *
   * To keep your implementation simple, the tests will not cover error conditions.
   * Specifically: `pop` or `shift` will never be called on an empty list.
   *
   * @return {any} the last node in the linkedlist
   */
  pop() {
    let poppedElement = this.tail;
    if (this.tail.previous === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }

    return poppedElement.value;
  }

  /**
   * Remove an element from the front of the linkedlist and return it.
   * _remove value at front_
   *
   * To keep your implementation simple, the tests will not cover error conditions.
   * Specifically: `pop` or `shift` will never be called on an empty list.
   *
   * @return {any} the front/first node in the linkedlist
   */
  shift() {
    let shiftedElement = this.head;
    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.previous = null;
    }

    return shiftedElement.value;
  }

  /**
   * Add an element to the front/start of the linkedlist.
   * _insert value at front_
   *
   * @param {any} value
   */
  unshift(value) {
    let listNode = new Node(value)
    if (this.head === null) {
      this.head = listNode;
      this.tail = listNode;
    } else {
      this.head.previous = listNode
      listNode.next = this.head;
      this.head = listNode;
    }
  }

  /**
   * Delete the first occurrence of a specified value
   *
   * @param {any} value
   */
  delete(value) {
    if (this.head === null) {
      return;
    }

    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        if (current.previous === null && current.next === null) {
          this.head = null;
          this.tail = null;
        } else if (current.previous === null) {
          this.head = current.next;
          this.head.previous = null;
        } else if (current.next === null) {
          this.tail = current.previous;
          this.tail.next = null;
        } else {
          current.previous.next = current.next;
          current.next.previous = current.previous;
        }

        current = null;
      } else {
        current = current.next;
      }
    }
  }

  /**
   * Count the number of items in the list.
   *
   * @return {Number} the number of items/values in the list.
   */
  count() {
    let valueCount = 0;
    let current = this.head;
    while (current !== null) {
      valueCount++;
      current = current.next;
    }

    return valueCount;
  }
}
