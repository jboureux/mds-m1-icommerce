import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export default async function verifyToken(
  req: Request & { userId?: string }, // Ajouter userId au type Request
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ message: 'Token not provided' });
    return; // Ajouter un `return` pour s'assurer que la fonction s'arrête ici
  }
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/verify_token`,
      {},
      {
        headers: {
          Authorization: `${token}`, // Inclure le token
        },
      },
    );
    if (response.data.isTokenValid) {
      req.userId = response.data.userId; // Attacher l'userId à l'objet req
      next(); // Appeler `next()` pour passer au middleware ou contrôleur suivant
    } else {
      res.status(401).json({ message: 'Token not valid' });
      return; // Ajouter un `return` pour éviter que `next()` soit appelé après
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Token verification failed', error: error as Error });
    return; // Assurer que la fonction se termine après l'envoi de la réponse
  }
}
