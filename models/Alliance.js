'use strict';

const { BaseModel } = require('./BaseModel');

class Alliance extends BaseModel {

  static get tableName() {
    return 'alliances';
  }

  static get relationMappings() {

    return {
      rokAccounts: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'RokAccount',
        join: {
          from: 'rokAccounts.allianceId',
          to: 'alliances.id'
        }
      }

    };
  }
}

module.exports = {
    Alliance
};