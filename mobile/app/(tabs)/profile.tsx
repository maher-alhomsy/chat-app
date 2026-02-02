import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
  return (
    <SafeAreaView className="bg-surface flex-1">
      <Text className="text-blue-500 text-2xl">Profile Tab</Text>
    </SafeAreaView>
  );
};

export default Page;
