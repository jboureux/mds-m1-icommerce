import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  registerUser() {
    return this.userService.register()
  }

  loginUser() {
    return this.userService.login()
  }
  
  getUserData() {
    return this.userService.getUserData()
  }
}
