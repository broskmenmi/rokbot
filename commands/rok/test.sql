SELECT
  `TroopConfiguration`.`Type`,
  `TroopConfiguration`.`Rank`,
  `TroopConfiguration`.`Count`,
  `TroopConfiguration`.`RokAccountName`,
  `TroopConfiguration`.`createdAt`,
  `TroopConfiguration`.`updatedAt`,
  `RokAccount`.`Name` AS `RokAccount.Name`,
  `RokAccount`.`Rank` AS `RokAccount.Rank`,
  `RokAccount`.`createdAt` AS `RokAccount.createdAt`,
  `RokAccount`.`updatedAt` AS `RokAccount.updatedAt`,
  `RokAccount`.`DiscordUserId` AS `RokAccount.DiscordUserId`,
  `RokAccount->DiscordUser`.`Id` AS `RokAccount.DiscordUser.Id`,
  `RokAccount->DiscordUser`.`createdAt` AS `RokAccount.DiscordUser.createdAt`,
  `RokAccount->DiscordUser`.`updatedAt` AS `RokAccount.DiscordUser.updatedAt`
FROM
  `TroopConfigurations` AS `TroopConfiguration`
  LEFT OUTER JOIN (
    `RokAccounts` AS `RokAccount`
    INNER JOIN `DiscordUsers` AS `RokAccount->DiscordUser` ON `RokAccount`.`DiscordUserId` = `RokAccount->DiscordUser`.`Id`
    AND `RokAccount->DiscordUser`.`Id` = '400137876894908416'
  ) ON `TroopConfiguration`.`RokAccountName` = `RokAccount`.`Name`;