'use strict';

const { BaseModel } = require('./BaseModel');

class DiscordUser extends BaseModel {

  static get tableName() {
    return 'discordUsers';
  }

  static get relationMappings() {

    return {
      rokAccounts: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'RokAccount',
        join: {
          from: 'discordUsers.id',
          to: 'rokAccounts.discordUserId'
        }
      }

    };
  }
}

module.exports = {
    DiscordUser
};