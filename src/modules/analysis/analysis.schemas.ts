import { z } from 'zod';

export const createAnalysisSchema = z.object({
  id: z.uuid(),
  resume_id: z.uuid(),
  job_posting_id: z.uuid(),
  score: z.int().min(0).max(100),
  breakdown: z.json(),
  suggestions: z.array(z.string()),
  created_at: z.iso.datetime(),
});

export const getAnalysisByIdSchema = z.object({
  id: z.uuid()
});

export const deleteAnalysisByIdSchema = z.object({
  id: z.uuid()
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;
export type GetAnalysisByIdInput = z.infer<typeof getAnalysisByIdSchema>;
export type DeleteAnalysisByIdInput = z.infer<typeof deleteAnalysisByIdSchema>;
