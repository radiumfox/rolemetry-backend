exports.up = (pgm) => {
  pgm.createTable('job_postings', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    title: { type: 'text', notNull: true },
    description: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });
  pgm.createIndex('job_postings', 'created_at');
};

exports.down = (pgm) => {
  pgm.dropTable('job_postings');
};
