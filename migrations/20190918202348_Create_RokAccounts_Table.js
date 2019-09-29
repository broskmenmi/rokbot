
exports.up = function(knex) {
    return knex.schema.createTable('rokAccounts', function(t) {
        t.increments('id').primary();
        t.string('name').notNull();
        //t.string('discordUserId').notNull();
        t
        .string('discordUserId')
        .unsigned()
        .references('id')
        .inTable('discordUsers')
        .onDelete('SET NULL')
        .index();

        //t.string('allianceId').notNull();
        t
        .string('allianceId')
        .unsigned()
        .references('id')
        .inTable('alliances')
        .onDelete('SET NULL')
        .index();

        t.integer('rank').notNull();
        t.integer('maxRallySize').notNull();

        //t.dateTime('createdAt').notNull();
        // t.dateTime('updatedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('rokAccounts');  
};
