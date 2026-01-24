import { clerkClient, getAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';

import { User } from '../models/User';
import type { AuthRequest } from '../middleware/auth';

async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

async function authCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = new User({
        clerkId: clerkUser.id,
        avatar: clerkUser.imageUrl,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress.split('@')[0],
      });

      await user.save();
      res.status(201).json({ user });
    }
  } catch (error) {
    next(error);
  }
}

export { getMe, authCallback };
