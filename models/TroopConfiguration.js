const { BaseModel } = require('./BaseModel');

class TroopConfiguration extends BaseModel {

  static get tableName() {
    return 'troopConfigurations';
  }

  static get relationMappings() {
      
    return {
      army_governor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'RokAccount',
        join: {
          from: 'troopConfigurations.rokAccountName',
          to: 'rokAccounts.name'
        }
      }

    };
  }
}

module.exports = {
    TroopConfiguration
};