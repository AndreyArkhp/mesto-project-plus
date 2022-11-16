export default class DuplicateKeyError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 409;
  }

  get getStatusCode() {
    return this._statusCode;
  }
}
