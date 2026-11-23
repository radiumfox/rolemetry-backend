import { ERROR_CODES } from '@/lib/errors/constants.js';
import { TextExtractionError } from '../errors.js';

export const normalizeText = (raw: string): string => {
  const text = raw
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .trim();

  if (text.length === 0) {
    throw new TextExtractionError(
      ERROR_CODES.TEXT_EXTRACTION_FAILED,
      'Extracted text is empty or whitespace-only.'
    );
  }

  return text;
};
