import express from 'express';
import { clerkMiddleware } from '@clerk/express';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import chatRouter from './routes/chat.route';
import messageRouter from './routes/message.route';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

app.use(errorHandler);

export default app;
