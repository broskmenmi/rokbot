
exports.up = function(knex) {
    return knex.schema.createTable('discordUsers', function(t) {
        t.string('id').notNull().primary();
        t.string('name').notNull();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('discordUsers');  
};
