export default function demandForNumber(parameters: string[], message: string) {
  let invalid = false;
  let content = null;
  if (!parameters || parameters.length <= 0 || parameters[0].trim() === "") {
    content = `${message} is required!`;
    invalid = true;
  }

  const lookForNumber = parameters[0].match(/\d/g);

  if (!lookForNumber) {
    content = `${message} is invalid!`;
    invalid = true;
  }

  return {
    invalid,
    content: content === null ? lookForNumber?.join("") : content,
  };
}
