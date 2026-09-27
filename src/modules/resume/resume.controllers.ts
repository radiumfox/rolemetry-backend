import { mapError } from '@/lib/errors/mapper.js';
import { getQueries } from '@/lib/db/queries.js';
import { type Request, type Response } from 'express';
import { RESUME_ALLOWED_FIELDS, RESUMES_TABLE_NAME } from './config.js';
import { CreateResumeInput, DeleteResumeByIdInput, GetResumeByIdInput } from '@/modules/resume/resume.schemas.js';

const {
  getAll,
  getSingleById,
  addSingle,
  deleteSingleById
} = getQueries(RESUMES_TABLE_NAME);

export const getResumes = function (req: Request, res: Response) {
  getAll((error, result) => {
    if (error) {
      const { status, code, message } = mapError(error);

      res.status(status).json({ status, code, message });
    } else {
      res.status(200).json(result);
    }
  });
};

export const getResumeById = function (req: Request<GetResumeByIdInput>, res: Response) {
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

export const createResume = function (req: Request<object, object, CreateResumeInput>, res: Response) {
  const id = req.body.id;
  const file_name = req.body.file_name;
  const extracted_text = req.body.extracted_text;
  const created_at = req.body.created_at;

  addSingle(
    RESUME_ALLOWED_FIELDS,
    [id, file_name, extracted_text, created_at],
    (error, result) => {
      if (error) {
        const { status, code, message } = mapError(error);

        return res.status(status).json({ status, code, message });
      }

      res.status(201).json(result);
    }
  );
};


export const deleteResumeById = function (req: Request<DeleteResumeByIdInput>, res: Response) {
  const id = req.params.id;

  deleteSingleById(id, (error, deleted) => {
    if (error) {
      const { status, code, message } = mapError(error);

      return res.status(status).json({ status, code, message });
    }

    res.status(200).json({ deleted });
  });
};