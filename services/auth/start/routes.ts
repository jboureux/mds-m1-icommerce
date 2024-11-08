/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('generate_token', [AuthController, 'generateToken'])
    router.post('verify_token', [AuthController, 'verifyToken'])
  })
  .prefix('auth')
