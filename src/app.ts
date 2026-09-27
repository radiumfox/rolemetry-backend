import { API_PREFIX } from './config/constants.js';
import { analysisRouter } from '@/modules/analysis/analysis.routes.js';
import { resumeRouter } from '@/modules/resume/resume.routes.js';
import { jobPostingRouter } from '@/modules/job-posting/job-posting.routes.js';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { env } from '@/config/env.js';
import {swaggerJsdocOptions} from '@/config/swaggerJsdocOptions.js';

export const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 60_000,
    limit: env.NODE_ENV === 'test' ? 1_000 : 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  })
);

const specs = swaggerJsdoc(swaggerJsdocOptions);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(`${API_PREFIX}/analyses`, analysisRouter);
app.use(`${API_PREFIX}/resumes`, resumeRouter);
app.use(`${API_PREFIX}/job-postings`, jobPostingRouter);
