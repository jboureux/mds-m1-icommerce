import User from '#models/user'
import { createUserValidator, loginUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserService {
  constructor(private ctx: HttpContext) {}

  async register() {
    const { request, response } = this.ctx

    try {
      const data = await request.validateUsing(createUserValidator)

      const user = await User.create(data)

      return response.created({ message: 'user created succesfully', user })
    } catch (error) {
      return response.badRequest({ error: error })
    }
  }

  async login() {
    const { request, response } = this.ctx
    try {
      const { email, password } = await request.validateUsing(loginUserValidator)

      const user = await User.verifyCredentials(email, password)

      return response.ok({ message: 'Login successful', user })
    } catch (error) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.badRequest({ message: 'email or password incorrect' })
      } else {
        return response.badRequest({ error })
      }
    }
  }

  async getUserData() {
    const { request, response } = this.ctx
    try {
      const { userId } = request.only(['userId'])
      const userData = await User.findOrFail(userId)
      return response.ok(userData)
    } catch (error) {
      return response.badRequest({ error })
    }
  }
}
