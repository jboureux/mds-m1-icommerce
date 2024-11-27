import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'

test.group('AuthService - Authentication Endpoints', (group) => {
  group.each.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  /**
   * Test: Generate Token
   */
  test('it should generate a token successfully', async ({ assert, client }) => {
    const requestData = {
      userId: 1,
    }
    const response = await client.post('/auth/generate_token').json(requestData)
    response.assertStatus(201)
    assert.exists(response.body().token)
  })

  test('it should return an error if userId is missing', async ({ assert, client }) => {
    const response = await client.post('/auth/generate_token').json({})
    response.assertStatus(400)
    assert.property(response.body(), 'authError')
    assert.equal(
      response.body().authError,
      'Cannot use "User" model for managing access tokens. The value of column "id" is undefined or null'
    )
  })

  /**
   * Test: Verify Token
   */
  test('it should verify a valid token successfully', async ({ assert, client }) => {
    // Simulate token generation
    const generateTokenResponse = await client.post('/auth/generate_token').json({
      userId: 1,
    })
    const token = generateTokenResponse.body().token.token

    // Verify token
    const response = await client
      .post('/auth/verify_token')
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.deepEqual(response.body(), { isTokenValid: true, userId: 1 })
  })

  test('it should return an error if token is not provided', async ({ assert, client }) => {
    const response = await client.post('/auth/verify_token')
    response.assertStatus(400)
    assert.property(response.body(), 'authError')
    assert.equal(response.body().authError, 'Token not provided')
  })

  test('it should return false for an invalid token', async ({ assert, client }) => {
    const response = await client
      .post('/auth/verify_token')
      .header('Authorization', 'Bearer invalid_token')
    response.assertStatus(200)
    assert.deepEqual(response.body(), { isTokenValid: false })
  })

  test('it should return an error if the token format is incorrect', async ({ assert, client }) => {
    const response = await client
      .post('/auth/verify_token')
      .header('Authorization', 'InvalidFormatToken')
    response.assertStatus(200)
    assert.deepEqual(response.body(), { isTokenValid: false })
  })
})
