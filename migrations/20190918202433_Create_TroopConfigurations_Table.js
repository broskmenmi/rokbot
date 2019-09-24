
exports.up = function(knex) {
    return knex.schema.createTable('troopConfigurations', t => {
        t.increments('id').primary();
        t.string('type').notNull();
        //t.string('rokAccountId').notNull();
        t.integer('rank').notNull();
        t.integer('count').notNull();

        // t.dateTime('createdAt').notNull();
        // t.dateTime('updatedAt').nullable();

        t
        .integer('rokAccountId')
        .unsigned()
        .references('id')
        .inTable('rokAccounts')
        .onDelete('SET NULL')
        .index();
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('troopConfigurations');    
};
