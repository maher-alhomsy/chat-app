import { useAuth, useClerk } from '@clerk/clerk-expo';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="bg-surface flex-1">
      <Text className="text-blue-500 text-2xl">Chat Tab</Text>

      <Pressable
        onPress={() => {
          signOut({ redirectUrl: '/' });
        }}
      >
        <Text className="text-2xl text-red-500">Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Page;
