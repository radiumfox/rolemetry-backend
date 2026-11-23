import { MappedError } from './types.js';

export const FALLBACK_ERROR: MappedError = {
  status: 500,
  code: 'INTERNAL_ERROR',
  message: 'Internal server error.',
};

export const ERROR_CODES = {
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  INVALID_FILE_CONTENT: 'INVALID_FILE_CONTENT',
  TEXT_EXTRACTION_FAILED: 'TEXT_EXTRACTION_FAILED'
};