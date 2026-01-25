import { isValidObjectId } from 'mongoose';
import type { NextFunction, Response } from 'express';

import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import type { AuthRequest } from '../middleware/auth';

async function getMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { chatId } = req.params;

    if (!isValidObjectId(chatId)) {
      res.status(400).json({ message: 'Invalid chatId' });
      return;
    }

    const chat = await Chat.findOne({ _id: chatId, participants: userId });

    if (!chat) {
      res.status(404).json({ message: 'Chat not found or access denied' });
      return;
    }

    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'name email avatar')
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
}

export { getMessages };
