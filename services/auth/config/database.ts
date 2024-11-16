import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        port: env.get('AUTH_DB_PORT'),
        host: env.get('AUTH_DB_HOST'),
        user: env.get('AUTH_DB_USER'),
        password: env.get('AUTH_DB_PASSWORD'),
        database: env.get('AUTH_DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
