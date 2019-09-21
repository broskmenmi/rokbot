'use strict';

const { BaseModel } = require('./BaseModel');

class Alliance extends BaseModel {
  static get tableName() {
    return 'alliances';
  }

  static get idColumn() {
    return 'name';
  }

  static get relationMappings() {

    return {
      rokAccounts: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'RokAccount',
        join: {
          from: 'alliances.name',
          to: 'rokAccounts.allianceName'
        }
      }

    };
  }
}

module.exports = {
    Alliance
};