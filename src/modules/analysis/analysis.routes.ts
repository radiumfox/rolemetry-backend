import express from 'express';
import {
  createAnalysis,
  deleteAnalysisById,
  getAnalyses,
  getAnalysisById
} from '@/modules/analysis/analysis.controllers.js';
import { validateBody } from '@/lib/validation/validateBody.js';
import {
  createAnalysisSchema,
  deleteAnalysisByIdSchema,
  getAnalysisByIdSchema
} from '@/modules/analysis/analysis.schemas.js';
import { validateParams } from '@/lib/validation/validateParams.js';

export const analysisRouter = express.Router();

/**
 * @openapi
 * /api/v1/analyses:
 *   get:
 *     tags:
 *       - Analyses
 *     summary: List analyses
 *     operationId: getAnalyses
 *     responses:
 *       '200':
 *         description: Analyses returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Analysis'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
analysisRouter.get('/', getAnalyses);

/**
 * @openapi
 * '/api/v1/analyses/{id}':
 *   get:
 *     tags:
 *       - Analyses
 *     summary: Get an analysis by id
 *     operationId: getAnalysisById
 *     parameters:
 *       - $ref: '#/components/parameters/AnalysisId'
 *     responses:
 *       '200':
 *         description: Analysis returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analysis'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
analysisRouter.get('/:id', validateParams(getAnalysisByIdSchema), getAnalysisById);

/**
 * @openapi
 * /api/v1/analyses:
 *   post:
 *     tags:
 *       - Analyses
 *     summary: Create an analysis
 *     operationId: createAnalysis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnalysisRequest'
 *     responses:
 *       '201':
 *         description: Analysis created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Analysis'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '409':
 *         $ref: '#/components/responses/ApiError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
analysisRouter.post('/', validateBody(createAnalysisSchema), createAnalysis);

/**
 * @openapi
 * '/api/v1/analyses/{id}':
 *   delete:
 *     tags:
 *       - Analyses
 *     summary: Delete an analysis by id
 *     operationId: deleteAnalysisById
 *     parameters:
 *       - $ref: '#/components/parameters/AnalysisId'
 *     responses:
 *       '200':
 *         description: Analysis deletion result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteAnalysisResponse'
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       default:
 *         $ref: '#/components/responses/ApiError'
 */
analysisRouter.delete('/:id', validateParams(deleteAnalysisByIdSchema), deleteAnalysisById);

