import type { MappedError } from './types.js';
import { isPgDatabaseError } from '@/lib/db/errors/guards.js';
import { mapPgDatabaseError } from '@/lib/db/errors/mapper.js';
import { FALLBACK_ERROR } from '@/lib/errors/constants.js';
import { HttpError } from '@/lib/errors/httpError.js';

export const mapError = (error: unknown): MappedError => {
  if (isPgDatabaseError(error)) {
    return mapPgDatabaseError(error);
  }

  if (error instanceof HttpError) {
    return { status: error.status, code: error.code, message: error.message };
  }

  return FALLBACK_ERROR;
};