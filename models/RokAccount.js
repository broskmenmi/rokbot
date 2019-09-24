'use strict';

const { BaseModel } = require('./BaseModel');

class RokAccount extends BaseModel {

  static get tableName() {
    return 'rokAccounts';
  }

  static get relationMappings() {

    return {
      discordUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'DiscordUser',
        join: {
          from: 'rokAccounts.discordUserId',
          to: 'discordUsers.id'
        }
      },
      alliance: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Alliance',
        join: {
          from: 'rokAccounts.allianceId',
          to: 'alliances.id'
        }
      },
      army: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'TroopConfiguration',
        join: {
          from: 'rokAccounts.id',
          to: 'troopConfigurations.rokAccountId'
        }
      }

    };
  }
}

module.exports = {
  RokAccount
};