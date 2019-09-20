
exports.up = function(knex) {
    return knex.schema.createTable('troopConfigurations', function(t) {
        t.string('type').notNull().primary();
        t.string('rokAccountName').notNull().primary();
        t.integer('rank').notNull().primary();
        t.integer('count').notNull();

        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('troopConfigurations');    
};
