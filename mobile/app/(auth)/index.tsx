import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useSocialAuth from '@/hooks/useSocialAuth';

const Page = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  const { height, width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden"></View>

      <SafeAreaView className="flex-1">
        <View className="items-center pt-10">
          <Image
            contentFit="contain"
            source={require('../../assets/images/logo.png')}
            style={{ width: 100, height: 100, marginVertical: -20 }}
          />

          <Text className="text-4xl font-bold text-primary uppercase tracking-wider font-serif">
            Whisper
          </Text>
        </View>

        <View className="flex-1 justify-center items-center px-6">
          <Image
            contentFit="contain"
            source={require('../../assets/images/auth.png')}
            style={{ width: width - 48, height: height * 0.3 }}
          />

          <View className="mt-6 items-center">
            <Text className="text-5xl font-bold text-foreground text-center font-sans">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary font-mono">
              Seamlessly
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4 mt-10">
          <Pressable
            disabled={!!loadingStrategy}
            onPress={handleSocialAuth.bind(null, 'oauth_google')}
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
          >
            {loadingStrategy === 'oauth_google' ? (
              <ActivityIndicator size="small" color="#1a1a1a" />
            ) : (
              <>
                <Image
                  contentFit="contain"
                  style={{ width: 20, height: 20 }}
                  source={require('../../assets/images/google.png')}
                />
                <Text className="text-gray-900 font-semibold text-sm">
                  Google
                </Text>
              </>
            )}
          </Pressable>

          <Pressable
            disabled={!!loadingStrategy}
            onPress={handleSocialAuth.bind(null, 'oauth_apple')}
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
          >
            {loadingStrategy === 'oauth_apple' ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                <Text className="text-foreground font-semibold text-sm">
                  Apple
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Page;
