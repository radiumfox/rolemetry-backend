import { z } from 'zod';

export const createResumeSchema = z.object({
  id: z.uuid(),
  file_name: z.string(),
  extracted_text: z.string(),
  created_at: z.iso.datetime(),
});

export const getResumeByIdSchema = z.object({
  id: z.uuid()
});

export const deleteResumeByIdSchema = z.object({
  id: z.uuid()
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type GetResumeByIdInput = z.infer<typeof getResumeByIdSchema>;
export type DeleteResumeByIdInput = z.infer<typeof deleteResumeByIdSchema>;

