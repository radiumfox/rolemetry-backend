import express from 'express';
import { validateBody } from '@/lib/validation/validateBody.js';
import { validateParams } from '@/lib/validation/validateParams.js';
import { createResumeSchema, deleteResumeByIdSchema, getResumeByIdSchema } from '@/modules/resume/resume.schemas.js';
import { getResumes, getResumeById, createResume, deleteResumeById } from '@/modules/resume/resume.controllers.js';

export const resumeRouter = express.Router();

/**
 * @openapi
 * /api/v1/resumes:
 *   get:
 *     tags:
 *       - Resumes
 *     summary: List resumes
 *     operationId: getResumes
 *     responses:
 *       '200':
 *         description: Resumes returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resume'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
resumeRouter.get('/', getResumes);

/**
 * @openapi
 * '/api/v1/resumes/{id}':
 *   get:
 *     tags:
 *       - Resumes
 *     summary: Get a resume by id
 *     operationId: getResumeById
 *     parameters:
 *       - $ref: '#/components/parameters/ResumeId'
 *     responses:
 *       '200':
 *         description: Resume returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
resumeRouter.get('/:id', validateParams(getResumeByIdSchema), getResumeById);

/**
 * @openapi
 * /api/v1/resumes:
 *   post:
 *     tags:
 *       - Resumes
 *     summary: Create a resume
 *     operationId: createResume
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResumeRequest'
 *     responses:
 *       '201':
 *         description: Resume created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ApiError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
resumeRouter.post('/', validateBody(createResumeSchema), createResume);

/**
 * @openapi
 * '/api/v1/resumes/{id}':
 *   delete:
 *     tags:
 *       - Resumes
 *     summary: Delete a resume by id
 *     operationId: deleteResumeById
 *     parameters:
 *       - $ref: '#/components/parameters/ResumeId'
 *     responses:
 *       '200':
 *         description: Resume deletion result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResumeResponse'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
resumeRouter.delete('/:id', validateParams(deleteResumeByIdSchema), deleteResumeById);
