const { BaseModel } = require('./BaseModel');

class TroopConfiguration extends BaseModel {

  static get tableName() {
    return 'troopConfigurations';
  }

  // static get idColumn() {
  //   return ['rokAccountId', 'type', 'rank'];
  // }

  static get relationMappings() {
      
    return {
      army_governor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'RokAccount',
        join: {
          from: 'troopConfigurations.id',
          to: 'rokAccounts.id'
        }
      }

    };
  }
}

module.exports = {
    TroopConfiguration
};