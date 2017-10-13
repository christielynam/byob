module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/byob_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    /* eslint-disable no-alert, quotes */
    connection: process.env.DATABASE_URL + `?ssl=true`,
    /* eslint-enable no-alert, quotes */
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
