import type { NextFunction, Response } from 'express';

import type { AuthRequest } from '../middleware/auth';
import { Chat } from '../models/Chat';

async function getChats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    const chats = await Chat.find({ participants: userId })
      .populate('participants', 'name email avatar')
      .populate('lastMessage')
      .sort({ lastMessageAt: -1 });

    const formatedChats = chats.map((chat) => {
      const otherParticipants = chat.participants.filter(
        ({ _id }) => _id.toString() !== userId,
      );

      return {
        _id: chat._id,
        createdAt: chat.createdAt,
        lastMessage: chat.lastMessage,
        participants: otherParticipants,
        lastMessageAt: chat.lastMessageAt,
      };
    });

    res.json(formatedChats);
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
}

async function getOrCreateChat(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { participantId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    })
      .populate('participants', 'name email avatar')
      .populate('lastMessage');

    if (!chat) {
      const newChat = new Chat({ participants: [userId, participantId] });
      await newChat.save();

      chat = await newChat.populate('participants', 'name email avatar');
    }

    const otherParticipants = chat.participants.filter(
      ({ _id }) => _id.toString() !== userId,
    );

    res.json({
      _id: chat.id,
      createdAt: chat.createdAt,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      participant: otherParticipants ?? null,
    });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
}

export { getChats, getOrCreateChat };
