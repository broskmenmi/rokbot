
exports.up = function(knex) {
    return knex.schema.createTable('discordUsers', function(t) {
        t.string('id').notNull().primary();
        t.string('name').nullable();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('discordUsers');  
};
