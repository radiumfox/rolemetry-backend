import path from 'node:path';
import { TextExtractionError } from '@/modules/resume/errors.js';
import { ERROR_CODES } from '@/lib/errors/constants.js';
import { normalizeText } from './normalizeText.js';
import { extractors } from './extractors.js';

export interface ExtractedResumeText {
    fileName: string;
    text: string;
}

export const extractResumeText = async (file: Express.Multer.File): Promise<ExtractedResumeText> => {
  const extension = path.extname(file.originalname).toLowerCase();
  const extractor = extractors[extension];

  if (!extractor) {
    throw new TextExtractionError(ERROR_CODES.UNSUPPORTED_FILE_TYPE, `Unsupported file type: ${extension}`);
  }

  if (!extractor.hasValidSignature(file.buffer)) {
    throw new TextExtractionError(ERROR_CODES.INVALID_FILE_CONTENT, 'File content does not match its extension.');
  }

  let raw: string;

  try {
    raw = await extractor.extract(file.buffer);
  } catch (cause) {
    throw new TextExtractionError(ERROR_CODES.TEXT_EXTRACTION_FAILED, 'Could not extract text from the uploaded file.', { cause });
  }

  const text = normalizeText(raw);

  return {
    fileName: path.basename(file.originalname).slice(0, 255),
    text,
  };
};