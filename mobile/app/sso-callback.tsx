import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

const SSOCallback = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(tabs)" />;

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#F4A261" />
    </View>
  );
};

export default SSOCallback;
