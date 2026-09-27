/**
 * @openapi
 * components:
 *   schemas:
 *     Analysis:
 *       type: object
 *       required:
 *         - id
 *         - resume_id
 *         - job_posting_id
 *         - score
 *         - breakdown
 *         - suggestions
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 77d1147d-36dc-4d5a-b167-9ad8cf5ee107
 *         resume_id:
 *           type: string
 *           format: uuid
 *           example: 3f8c1e52-0b7d-4a91-8c6e-1d2f5b7a9e30
 *         job_posting_id:
 *           type: string
 *           format: uuid
 *           example: b6d9a4c1-52e8-4f3b-9a70-8c1e2d3f4b5a
 *         score:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           example: 100
 *         breakdown:
 *           type: object
 *           additionalProperties: true
 *         suggestions:
 *           type: array
 *           items:
 *             type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2020-01-01T04:15:00Z'
 *     CreateAnalysisRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/Analysis'
 *     DeleteAnalysisResponse:
 *       type: object
 *       required:
 *         - deleted
 *       properties:
 *         deleted:
 *           type: boolean
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - status
 *         - code
 *         - message
 *       properties:
 *         status:
 *           type: integer
 *         code:
 *           type: string
 *         message:
 *           type: string
 *     ValidationErrorResponse:
 *       type: object
 *       required:
 *         - error
 *         - details
 *       properties:
 *         error:
 *           type: string
 *           example: Validation failed
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               path:
 *                 type: array
 *                 items: {}
 *               message:
 *                 type: string
 *   parameters:
 *     AnalysisId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *   responses:
 *     ValidationError:
 *       description: Request validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidationErrorResponse'
 *     ApiError:
 *       description: The request could not be completed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
