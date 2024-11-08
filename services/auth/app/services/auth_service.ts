import User from '#models/user'
import { inject } from '@adonisjs/core'
import { Secret } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthService {
  constructor(private ctx: HttpContext) {}

  // generate token
  async generateToken() {
    const { response, request } = this.ctx
    try {
      const id = request.only(['userId'])

      const user = new User()
      user.fill({ id: id.userId })
      const token = await User.accessTokens.create(user)
      return response.created({ token })
    } catch (error) {
      return response.badRequest({ authError: error.message })
    }
  }

  // verify token
  async verifyToken() {
    const { response, request } = this.ctx
    try {
      const userToken = request.header('Authorization')

      if (!userToken) {
        return response.badRequest({ authError: 'Token not provided' })
      }
      // Supprimer "Bearer " si nécessaire pour avoir seulement le token brut
      const token = userToken.startsWith('Bearer ') ? userToken.split(' ')[1] : userToken
      const secret = new Secret(token)
      const verify = await User.accessTokens.verify(secret)

      if (verify === null) {
        return response.ok({ isTokenValid: false })
      } else {
        const userId = verify?.tokenableId
        return response.ok({ isTokenValid: true, userId })
      }
    } catch (error) {
      return response.badRequest({ error: error })
    }
  }
}
