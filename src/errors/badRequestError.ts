export default class BedRequestError extends Error {
  private _statusCode: number;

  constructor(message: string) {
    super(message);
    this._statusCode = 400;
  }

  get getStatusCode() {
    return this._statusCode;
  }
}
