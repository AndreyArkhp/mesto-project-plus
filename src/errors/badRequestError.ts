export default class BadRequestError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 400;
  }

  public get getStatusCode() {
    return this._statusCode;
  }
}
