exports.up = (pgm) => {
  pgm.createTable('resumes', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    file_name: { type: 'text', notNull: true },
    extracted_text: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('resumes');
};