
exports.up = function(knex) {
    return knex.schema.createTable('alliances', function(t) {
        t.increments('id').primary();
        t.string('name').notNull();
        // t.dateTime('createdAt').notNull();
        // t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('alliances');    
};
