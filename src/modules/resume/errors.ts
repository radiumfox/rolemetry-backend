import {HttpError} from '@/lib/errors/httpError.js';

export class TextExtractionError extends HttpError {
  constructor(code: string, message: string, options?: ErrorOptions) {
    super(400, code, message, options);
    this.name = 'TextExtractionError';
  }
}