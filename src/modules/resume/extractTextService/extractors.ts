import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

interface Extractor {
    hasValidSignature: (buffer: Buffer) => boolean;
    extract: (buffer: Buffer) => Promise<string>;
}

export const extractors: Readonly<Record<string, Extractor>> = {
  '.txt': {
    hasValidSignature: () => true,
    extract: async buffer => buffer.toString('utf8'),
  },
  '.docx': {
    hasValidSignature: buffer => buffer.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])),
    extract: async buffer => (await mammoth.extractRawText({ buffer })).value,
  },
  '.pdf': {
    hasValidSignature: buffer => buffer.subarray(0, 5).toString('latin1') === '%PDF-',
    extract: async buffer => {
      const parser = new PDFParse({ data: buffer });
      try {
        return (await parser.getText()).text;
      } finally {
        await parser.destroy();
      }
    },
  },
};