import { Text, View, ActivityIndicator, Pressable } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useChats from '@/hooks/useChats';
import ChatList from '@/components/ChatList';

const Page = () => {
  const { data: chats, isLoading, error, refetch } = useChats();

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
        <Text className="text-red-500 text-3xl">Failed to load chats</Text>
        <Pressable
          onPress={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary rounded-lg"
        >
          <Text className="text-foreground">Retry</Text>
        </Pressable>
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
