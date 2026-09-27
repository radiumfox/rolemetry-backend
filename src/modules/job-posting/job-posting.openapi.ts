/**
 * @openapi
 * components:
 *   schemas:
 *     JobPosting:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: b6d9a4c1-52e8-4f3b-9a70-8c1e2d3f4b5a
 *         title:
 *           type: string
 *           example: Senior Frontend Engineer
 *         description:
 *           type: string
 *           example: We are looking for a senior frontend engineer to build our ATS platform.
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: '2020-01-01T04:15:00Z'
 *     CreateJobPostingRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/JobPosting'
 *     DeleteJobPostingResponse:
 *       type: object
 *       required:
 *         - deleted
 *       properties:
 *         deleted:
 *           type: boolean
 *   parameters:
 *     JobPostingId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 */
