
exports.up = function(knex) {
    return knex.schema.createTable('rokAccounts', function(t) {
        t.string('name').notNull().primary();
        t.string('discordUserId').notNull();
        t.string('allianceName').notNull();
        t.integer('rank').notNull();
        t.integer('maxRallySize').notNull();

        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('rokAccounts');  
};
