exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('types', (table) => {
      table.increments('id').primary();
      table.string('type').unique();
      table.timestamps(true, true);
    }),

    knex.schema.createTable('holidays', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('fullDate');
      table.string('month');
      table.integer('type_id');
      table.foreign('type_id')
        .references('types.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('holidays'),
    knex.schema.dropTable('types'),
  ]);
};
