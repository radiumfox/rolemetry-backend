import { z } from 'zod';

export const createJobPostingSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  created_at: z.iso.datetime(),
});

export const getJobPostingByIdSchema = z.object({
  id: z.uuid()
});

export const deleteJobPostingByIdSchema = z.object({
  id: z.uuid()
});

export type CreateJobPostingInput = z.infer<typeof createJobPostingSchema>;
export type GetJobPostingByIdInput = z.infer<typeof getJobPostingByIdSchema>;
export type DeleteJobPostingByIdInput = z.infer<typeof deleteJobPostingByIdSchema>;
