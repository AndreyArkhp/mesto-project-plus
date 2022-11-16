export default class NotFoundError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 404;
  }

  get getStatusCode() {
    return this._statusCode;
  }
}
