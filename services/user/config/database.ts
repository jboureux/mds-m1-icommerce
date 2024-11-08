import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('USER_DB_HOST'),
        port: env.get('USER_DB_PORT'),
        user: env.get('USER_DB_USER'),
        password: env.get('USER_DB_PASSWORD'),
        database: env.get('USER_DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
