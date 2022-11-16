export default class UnauthorizedError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 401;
  }

  get getStatusCode() {
    return this._statusCode;
  }
}
