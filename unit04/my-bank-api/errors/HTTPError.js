import { STATUS_CODES } from 'http';

class HTTPError extends Error {
  constructor(code, message, extras) {
    super(message || STATUS_CODES[code]);
    if (arguments.length >= 3 && extras) {
      Object.assign(this, extras);
    }
    this.statusCode = code;
  }
}
export default HTTPError;