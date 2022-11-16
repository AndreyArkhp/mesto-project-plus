export default class ForbiddenError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 403;
  }

  get getStatusCode() {
    return this._statusCode;
  }
}
