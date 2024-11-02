/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = ()=> import('#controllers/users_controller');

import router from '@adonisjs/core/services/router';

router.group(()=>{
  router.post('register',[
    UsersController,"registerUser",
  ]),

  router.post('login',[
    UsersController,"loginUser",
  ])

  router.delete('deleteMany',[
    UsersController,"deleteAll"
  ])

}).prefix("/user")
