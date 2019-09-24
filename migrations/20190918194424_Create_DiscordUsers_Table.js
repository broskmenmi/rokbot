
exports.up = function(knex) {
    return knex.schema.createTable('discordUsers', function(t) {
        t.increments('id').primary();
        t.string('userId').nullable();
        // t.dateTime('createdAt').notNull();
        // t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('discordUsers');  
};
