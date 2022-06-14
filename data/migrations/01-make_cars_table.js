exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.varchar('vin')
      .unique()
      .notNullable();
    tbl.varchar('make')
      .notNullable();
    tbl.varchar('model')
      .notNullable();
    tbl.float('mileage')
      .notNullable();
    tbl.varchar('title');
    tbl.varchar('transmission');
  });

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
