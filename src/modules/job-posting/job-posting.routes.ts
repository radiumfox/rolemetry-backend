import express from 'express';
import {
  createJobPosting,
  deleteJobPostingById,
  getJobPostings,
  getJobPostingById
} from '@/modules/job-posting/job-posting.controllers.js';
import { validateBody } from '@/lib/validation/validateBody.js';
import {
  createJobPostingSchema,
  deleteJobPostingByIdSchema,
  getJobPostingByIdSchema
} from '@/modules/job-posting/job-posting.schemas.js';
import { validateParams } from '@/lib/validation/validateParams.js';

export const jobPostingRouter = express.Router();

/**
 * @openapi
 * /api/v1/job-postings:
 *   get:
 *     tags:
 *       - Job Postings
 *     summary: List job postings
 *     operationId: getJobPostings
 *     responses:
 *       '200':
 *         description: Job postings returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPosting'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
jobPostingRouter.get('/', getJobPostings);

/**
 * @openapi
 * '/api/v1/job-postings/{id}':
 *   get:
 *     tags:
 *       - Job Postings
 *     summary: Get a job posting by id
 *     operationId: getJobPostingById
 *     parameters:
 *       - $ref: '#/components/parameters/JobPostingId'
 *     responses:
 *       '200':
 *         description: Job posting returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPosting'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
jobPostingRouter.get('/:id', validateParams(getJobPostingByIdSchema), getJobPostingById);

/**
 * @openapi
 * /api/v1/job-postings:
 *   post:
 *     tags:
 *       - Job Postings
 *     summary: Create a job posting
 *     operationId: createJobPosting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobPostingRequest'
 *     responses:
 *       '201':
 *         description: Job posting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobPosting'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ApiError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
jobPostingRouter.post('/', validateBody(createJobPostingSchema), createJobPosting);

/**
 * @openapi
 * '/api/v1/job-postings/{id}':
 *   delete:
 *     tags:
 *       - Job Postings
 *     summary: Delete a job posting by id
 *     operationId: deleteJobPostingById
 *     parameters:
 *       - $ref: '#/components/parameters/JobPostingId'
 *     responses:
 *       '200':
 *         description: Job posting deletion result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteJobPostingResponse'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
jobPostingRouter.delete('/:id', validateParams(deleteJobPostingByIdSchema), deleteJobPostingById);
