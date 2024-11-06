import { defineConfig, drivers } from '@adonisjs/core/hash'


export default defineConfig({
  // Make sure to update the default driver to argon
  default: 'argon',

  list: {
    argon: drivers.argon2({
      version: 0x13, 
      variant: 'id',
      iterations: 3,
      memory: 65536,
      parallelism: 4,
      saltSize: 16,
      hashLength: 32,
    })
  }
})



