exports.up = (pgm) => {
  pgm.createTable('analyses', {
    id: { type: 'uuid', primaryKey: true },
    score: { type: 'integer', notNull: true },
    breakdown: { type: 'jsonb', notNull: true },
    suggestions: { type: 'text[]' },
    created_at: { type: 'timestamptz(3)', notNull: true, default: pgm.func('now()') },
    resume_id: { type: 'uuid', notNull: true, references: 'resumes', onDelete: 'CASCADE' },
    job_posting_id: { type: 'uuid', references: 'job_postings', onDelete: 'SET NULL' },
  });

  pgm.createIndex('analyses', 'resume_id');
  pgm.createIndex('analyses', 'job_posting_id');
};

exports.down = (pgm) => {
  pgm.dropTable('analyses');
};
