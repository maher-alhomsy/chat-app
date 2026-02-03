import { Text, View, ActivityIndicator } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useChats from '@/hooks/useChats';
import ChatList from '@/components/ChatList';

const Page = () => {
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <Text className="text-red-500">Failed to load chats</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-surface flex-1">
      <ChatList chats={chats} />
    </SafeAreaView>
  );
};

export default Page;
