export class IncorrectIdentifierError extends Error {
    constructor(message) {
      super(message);
      this.name = "IncorrectIdentifierError";
    }
  }