import type { NextFunction, Response } from 'express';

import { User } from '../models/User';
import type { AuthRequest } from '../middleware/auth';

async function getUsers(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } })
      .select('name email avatar')
      .limit(50);

    res.json({ users });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
}

export { getUsers };
