import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}
  async generateToken() {
    return this.authService.generateToken()
  }

  async verifyToken() {
    return this.authService.verifyToken()
  }
}
