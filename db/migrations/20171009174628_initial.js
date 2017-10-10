
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('dates', (table) => {
      table.increments('id').primary()
      table.string('fullDate')
      table.string('month')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('holidays', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('type')
      table.integer('date_id').unsigned()
      table.foreign('date_id')
        .references('dates.id')
      table.timestamps(true, true)
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('holidays'),
    knex.schema.dropTable('dates'),
  ])
};
