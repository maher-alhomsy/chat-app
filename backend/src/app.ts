import express from 'express';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import chatRouter from './routes/chat.route';
import messageRouter from './routes/message.route';

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

export default app;
