
exports.up = function(knex) {
    return knex.schema.createTable('alliances', function(t) {
        t.string('id').unique().notNull().primary();
        // t.dateTime('createdAt').notNull();
        // t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('alliances');    
};
