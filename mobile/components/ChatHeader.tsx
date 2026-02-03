import { View, Text, Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const ChatHeader = () => {
  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable className="size-10 bg-primary rounded-full items-center justify-center">
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatHeader;
