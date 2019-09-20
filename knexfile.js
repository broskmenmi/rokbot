module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './rok.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};