import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4),
    password: vine.string().trim(),
    email: vine
      .string()
      .email()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        if (user) {
          throw new Error('email already exist')
        }
        return !user
      }),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().toLowerCase(),
    password: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(10),
    email: vine
      .string()
      .email()
      .trim()
      .toLowerCase()
      .unique(async (db, value) => {
        const user = await db.from('user').where('email', value).first()
        if (user) {
          throw new Error('email already exist')
        }
        return !user
      }),
  })
)
