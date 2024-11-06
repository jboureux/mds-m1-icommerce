// src/controllers/userController.ts

import { Request, Response } from "express";
import * as userService from "../services/userService";
import checkBody from "../utils/checkbody";

export async function registerUser(req: Request, res: Response) {
  const requiredFields = ["username", "password", "email"];
  const { username, email, password } = req.body;

  if (!checkBody(req.body, requiredFields)) {
    res.status(400).json({ result: false, error: "Missing or empty fields" });
    return;
  }

  try {
    const user = await userService.registerUser(username, password, email);
    res.json({ result: true, user });
  } catch (error) {
    console.error("Error in registerUser controller:", error);
    res.status(500).json({ result: false, error: (error as Error).message });
  }
}

export async function loginUser(req: Request, res: Response) {
  const requiredFields = ["username", "password", "email"];
  const { username, email, password } = req.body;

  if (!checkBody(req.body, requiredFields)) {
    res.status(400).json({ result: false, error: "Missing or empty fields" });
    return;
  }

  try {
    const user = await userService.loginUser(username, password, email);
    res.json({ result: true, user });
  } catch (error) {
    console.error("Error in loginUser controller:", error);
    res.status(500).json({ result: false, error: (error as Error).message });
  }
}

export async function deleteAllUsers(req: Request, res: Response) {
  try {
    await userService.deleteAllUsers();
    res.status(200).json({ result: true, message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAllUsers controller:", error);
    res.status(500).json({ result: false, error: (error as Error).message });
  }
}
