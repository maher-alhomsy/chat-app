import { FlatList } from 'react-native';

import { router } from 'expo-router';

import EmptyUI from './EmptyUI';
import ChatItem from './ChatItem';
import type { Chat } from '@/types';
import ChatHeader from './ChatHeader';

interface Props {
  chats: Chat[] | undefined;
}

const ChatList = ({ chats }: Props) => {
  function handleChatPress(chat: Chat) {
    const { participant, _id } = chat;

    router.push({
      pathname: '/chat/[id]',
      params: {
        id: _id,
        name: participant.name,
        avatar: participant.avatar,
        participantId: participant._id,
      },
    });
  }

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => (
        <ChatItem chat={item} onPress={() => handleChatPress(item)} />
      )}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<ChatHeader />}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: 20,
      }}
      ListEmptyComponent={
        <EmptyUI
          iconSize={64}
          title="No chats yat"
          iconColor="#6B6B70"
          buttonLabel="New Chat"
          iconName="chatbubbles-outline"
          subtitle="Start a conversation!"
          onPressButton={() => {
            console.log('Pressed');
          }}
        />
      }
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

export default ChatList;
