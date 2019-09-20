
exports.up = function(knex) {
    return knex.schema.createTable('alliances', function(t) {
        t.string('name').notNull().primary();

        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('alliances');    
};
