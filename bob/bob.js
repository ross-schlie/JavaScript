/**
 * Simulate bob's answers to input.
 *
 * Bob answers 'Sure.' if you ask him a question, such as "How are you?".
 * He answers 'Whoa, chill out!' if you YELL AT HIM (in all capitals).
 * He answers 'Calm down, I know what I'm doing!' if you yell a question at him.
 * He says 'Fine. Be that way!' if you address him without actually saying anything.
 * He answers 'Whatever.' to anything else.
 *
 * @param {String} message Test used to interact with bob.
 * @return {String} Bob's answer
 */
export const hey = (message) => {
  message = message.trim();
  let response = "Whatever.";

  //check to make sure there are any actual letters in the message.
  const regex = /[a-zA-Z]/g;
  const found = message.match(regex);

  if (message === "") {
    response = "Fine. Be that way!";
  } else if (found !== null && message.toUpperCase() === message && message.endsWith("?")) {
    response = "Calm down, I know what I'm doing!";
  } else if (found !== null && message.toUpperCase() === message) {
    response = "Whoa, chill out!";
  } else if (message.endsWith("?")) {
    response = "Sure.";
  }

  return response;
};
