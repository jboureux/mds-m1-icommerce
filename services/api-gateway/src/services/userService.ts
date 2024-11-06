// src/services/userService.ts

export async function registerUser(username: string, password: string, email: string) {
  const response = await fetch(`${process.env.USER_SERVICE_URL}/user/register`, {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }
  return await response.json();
}

export async function loginUser(username: string, password: string, email: string) {
  const response = await fetch(`${process.env.USER_SERVICE_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }
  return await response.json();
}

export async function deleteAllUsers() {
  const response = await fetch(`${process.env.USER_SERVICE_URL}/user/deleteMany`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deletion failed: ${errorText}`);
  }
}
