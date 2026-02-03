import { Pressable, Text, View } from 'react-native';

import { Image } from 'expo-image';
import { formatDistanceToNow } from 'date-fns';

import { Chat } from '@/types';

interface Props {
  chat: Chat;
  onPress: () => void;
}

const ChatItem = ({ chat, onPress }: Props) => {
  const { participant, lastMessageAt } = chat;

  const isOnline = true;
  const isTyping = false;
  const hasUnread = false;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-3 active:opacity-70"
    >
      <View className="relative">
        <Image
          source={participant.avatar}
          style={{ width: 56, height: 56, borderRadius: 999 }}
        />

        {isOnline && (
          <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] border-surface" />
        )}
      </View>

      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-medium ${hasUnread ? 'text-primary' : 'text-foreground'}`}
          >
            {participant.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {hasUnread && <View className="size-2.5 bg-primary rounded-full" />}
            <Text className="text-xs text-subtle-foreground">
              {lastMessageAt
                ? formatDistanceToNow(new Date(lastMessageAt), {
                    addSuffix: false,
                  })
                : ''}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          {isTyping ? (
            <Text className="text-sm text-primary">typing...</Text>
          ) : (
            <Text
              numberOfLines={1}
              className={`text-sm flex-1 mr-3 ${hasUnread ? 'text-foreground font-medium' : 'text-subtle-foreground'}`}
            >
              {chat.lastMessage?.text || 'No message yet'}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
