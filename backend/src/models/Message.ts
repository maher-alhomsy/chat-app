import mongoose, { Schema, type Document } from 'mongoose';

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chat: {
      ref: 'Chat',
      required: true,
      type: mongoose.Types.ObjectId,
    },
    sender: {
      ref: 'User',
      required: true,
      type: mongoose.Types.ObjectId,
    },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

MessageSchema.index({ chat: 1, createdAt: 1 });

export const Message = mongoose.model('Message', MessageSchema);
