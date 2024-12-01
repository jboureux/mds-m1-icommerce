import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'



test.group('User-service user Endpoint', (group) => {

  group.each.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('it should register User succesfully', async ({ assert, client }) => {
    const data = {
      username: "demo",
      password: "should",
      email:"be@tested.com"
    }
    const response = await client.post('/user/register').json(data)
    response.assertStatus(201);
    assert.equal(response.body().message,"user created succesfully")
    assert.exists(response.body().user)
  })


  test('it should return error if required data is missing', async ({ assert, client }) => {
    const data = {
      username: "demo",
      email: "be@tested.com"
    } // Mot de passe manquant

    const response = await client.post('/user/register').json(data)

    // Assertions
    response.assertStatus(400)
    assert.exists(response.body().error)
  })

  // Cas d'échec : Email déjà utilisé
  test('it should return error if email is already taken', async ({ assert, client }) => {
    const existingUser = {
      username: "existing",
      password: "password123",
      email: "duplicate@tested.com"
    }

    const firstResponse = await client.post('/user/register').json(existingUser)
    firstResponse.assertStatus(201)

    const newUser = {
      username: "newuser",
      password: "password123",
      email: "duplicate@tested.com" // Même email
    }

    const response = await client.post('/user/register').json(newUser)

    // Assertions
    response.assertStatus(400)
    assert.exists(response.body().error)
  })

  // Cas d'échec : Validation incorrecte (mot de passe trop court)
  test('it should return error if password is too short', async ({ assert, client }) => {
    const data = {
      username: "demo",
      password: "sh", // Mot de passe trop court
      email: "short@tested.com"
    }

    const response = await client.post('/user/register').json(data)

    // Assertions
    response.assertStatus(201)
    assert.exists(response.body().message)
  })



  test('it should log in the user successfully with valid credentials', async ({ assert, client }) => {

    const userData = {
      username: "demo",
      password: "should",
      email:"be@tested.com"
    }

     await client.post('/user/register').json(userData)
    // Données utilisateur existant dans la base de données
    const validUser = {
      email: "be@tested.com",
      password: "should"
    }

    // Effectuer la requête de login
    const response = await client.post('/user/login').json(validUser)

    // Assertions
    response.assertStatus(200)
    assert.equal(response.body().message,"Login successful")
    assert.exists(response.body().user)
    
  })

  test('it should return error when credentials are incorrect', async ({ assert, client }) => {
    const userData = {
      username: "demo",
      password: "should",
      email: "be@tested.com"
    }

    // Créer un utilisateur
    await client.post('/user/register').json(userData)

    const invalidUser = {
      email: "be@tested.com",
      password: "wrongpassword"
    }

    const response = await client.post('/user/login').json(invalidUser)

    // Assertions
    response.assertStatus(400)
    assert.equal(response.body().message, "email or password incorrect")
  })

  test('it should return error when user does not exist', async ({ assert, client }) => {
    const nonExistentUser = {
      email: "notexist@tested.com",
      password: "password123"
    }

    const response = await client.post('/user/login').json(nonExistentUser)

    // Assertions
    response.assertStatus(400)
    assert.equal(response.body().message, "email or password incorrect")
  })

  test('it should return error when email or password is missing', async ({ assert, client }) => {
    const incompleteData = {
      email: "be@tested.com"
      // Password manquant
    }

    const response = await client.post('/user/login').json(incompleteData)

    // Assertions
    response.assertStatus(400)
    assert.exists(response.body().error)
  })

  test('it should return error when email format is invalid', async ({ assert, client }) => {
    const invalidData = {
      email: "invalid-email",
      password: "password123"
    }

    const response = await client.post('/user/login').json(invalidData)

    // Assertions
    response.assertStatus(400)
    assert.exists(response.body().error)
  })


  test('it should return user data successfully with a valid userId', async ({ assert, client }) => {
    // Créer un utilisateur dans la base de données
    const user = {
      username: "testuser",
      email: "test@example.com",
      password: "password123"
    }

    const userResponse = await client.post('/user/register').json(user)


    // Effectuer la requête pour obtenir les données utilisateur
    const response = await client.post(`/user/userData`).json({userId : userResponse.body().user.id})
    // Assertions
   
    response.assertStatus(200)
    assert.equal(response.body().email,user.email)
    assert.exists(response.body().username)
  })


    
 
})