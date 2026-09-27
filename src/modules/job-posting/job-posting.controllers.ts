import { mapError } from '@/lib/errors/mapper.js';
import { getQueries } from '@/lib/db/queries.js';
import { type Request, type Response } from 'express';
import { JOB_POSTINGS_TABLE_NAME, JOB_POSTING_ALLOWED_FIELDS } from './config.js';
import {
  CreateJobPostingInput,
  DeleteJobPostingByIdInput,
  GetJobPostingByIdInput
} from '@/modules/job-posting/job-posting.schemas.js';

const {
  getAll,
  getSingleById,
  addSingle,
  deleteSingleById
} = getQueries(JOB_POSTINGS_TABLE_NAME);

export const getJobPostings = function (req: Request, res: Response) {
  getAll((error, result) => {
    if (error) {
      const { status, code, message } = mapError(error);

      res.status(status).json({ status, code, message });
    } else {
      res.status(200).json(result);
    }
  });
};

export const getJobPostingById = function (req: Request<GetJobPostingByIdInput>, res: Response) {
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

export const createJobPosting = function (req: Request<object, object, CreateJobPostingInput>, res: Response) {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const created_at = req.body.created_at;

  addSingle(
    JOB_POSTING_ALLOWED_FIELDS,
    [id, title, description, created_at],
    (error, result) => {
      if (error) {
        const { status, code, message } = mapError(error);

        return res.status(status).json({ status, code, message });
      }

      res.status(201).json(result);
    }
  );
};

export const deleteJobPostingById = function (req: Request<DeleteJobPostingByIdInput>, res: Response) {
  const id = req.params.id;

  deleteSingleById(id, (error, deleted) => {
    if (error) {
      const { status, code, message } = mapError(error);

      return res.status(status).json({ status, code, message });
    }

    res.status(200).json({ deleted });
  });
};
