import { mapError } from '@/lib/errors/mapper.js';
import { getQueries } from '@/lib/db/queries.js';
import { type Request, type Response } from 'express';
import { ANALYSES_TABLE_NAME, ANALYSIS_ALLOWED_FIELDS } from './config.js';
import {
  CreateAnalysisInput,
  DeleteAnalysisByIdInput,
  GetAnalysisByIdInput
} from '@/modules/analysis/analysis.schemas.js';

const {
  getAll,
  getSingleById,
  addSingle,
  deleteSingleById
} = getQueries(ANALYSES_TABLE_NAME);

export const getAnalyses = function (req: Request, res: Response) {
  getAll((error, result) => {
    if (error) {
      const { status, code, message } = mapError(error);

      res.status(status).json({ status, code, message });
    } else {
      res.status(200).json(result);
    }
  });
};


export const getAnalysisById = function (req: Request<GetAnalysisByIdInput>, res: Response) {
  const id = req.params.id;

  getSingleById(id, (error, result) => {
    if (error) {
      const { status, code, message } = mapError(error);

      res.status(status).json({ status, code, message });
    } else {
      res.status(200).json(result);
    }
  });
};

export const createAnalysis = function (req: Request<object, object, CreateAnalysisInput>, res: Response) {
  const id = req.body.id;
  const resume_id = req.body.resume_id;
  const job_posting_id = req.body.job_posting_id;
  const score = req.body.score;
  const breakdown = req.body.breakdown;
  const suggestions = req.body.suggestions;
  const created_at = req.body.created_at;

  addSingle(
    ANALYSIS_ALLOWED_FIELDS,
    [id, resume_id, job_posting_id, score, breakdown, suggestions, created_at],
    (error, result) => {
      if (error) {
        const { status, code, message } = mapError(error);

        return res.status(status).json({ status, code, message });
      }

      res.status(201).json(result);
    }
  );
};

export const deleteAnalysisById = function (req: Request<DeleteAnalysisByIdInput>, res: Response) {
  const id = req.params.id;

  deleteSingleById(id, (error, deleted) => {
    if (error) {
      const { status, code, message } = mapError(error);

      return res.status(status).json({ status, code, message });
    }

    res.status(200).json({ deleted });
  });
};