/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('register', [UsersController, 'registerUser']),
      router.post('login', [UsersController, 'loginUser']),
      router.post('userData', [UsersController, 'getUserData']),
      router.delete('deleteMany', [UsersController, 'deleteAll'])
  })
  .prefix('/user')
