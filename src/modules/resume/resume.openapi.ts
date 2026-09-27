/**
 * @openapi
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       required:
 *         - id
 *         - file_name
 *         - extracted_text
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 3f8c1e52-0b7d-4a91-8c6e-1d2f5b7a9e30
 *         file_name:
 *           type: string
 *           example: cv.pdf
 *         extracted_text:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2020-01-01T04:15:00Z'
 *     CreateResumeRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/Resume'
 *     DeleteResumeResponse:
 *       type: object
 *       required:
 *         - deleted
 *       properties:
 *         deleted:
 *           type: boolean
 *   parameters:
 *     ResumeId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 */
