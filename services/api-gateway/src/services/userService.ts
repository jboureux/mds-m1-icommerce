// src/services/userService.ts
import axios from 'axios';

export async function registerUser(
  username: string,
  password: string,
  email: string,
) {
  const response = await fetch(
    `${process.env.USER_SERVICE_URL}/user/register`,
    {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }
  return await response.json();
}

export async function loginUser(password: string, email: string) {
  let responseFromUserService;
  try {
    responseFromUserService = await axios.post(
      `${process.env.USER_SERVICE_URL}/user/login`,
      {
        password,
        email,
      },
    );
  } catch (error) {
    throw new Error(`Login failed: ${(error as Error).message}`);
  }
  try {
    const userId = responseFromUserService.data.user.id;
    const responseFromAuthService = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/generate_token`,
      {
        userId,
      },
    );

    return {
      ...responseFromAuthService.data,
      userData: responseFromUserService.data.user,
    };
  } catch (error) {
    throw new Error(`Token generation failed: ${(error as Error).message}`);
  }
}

export async function deleteAllUsers() {
  const response = await fetch(
    `${process.env.USER_SERVICE_URL}/user/deleteMany`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deletion failed: ${errorText}`);
  }
}

export async function getUserData(userId: string) {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/user/userData`,
      {
        userId,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(`error user: ${(error as Error).message}`);
  }
}
