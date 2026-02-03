import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import useSocialAuth from '@/hooks/useSocialAuth';
import { AnimatedOrb } from '@/components/AnimatedOrb';

const Page = () => {
  const { height, width } = useWindowDimensions();
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={['#0D0D0F', '#1A1A2E', '#16213E', '#0D0D0F']}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
        />

        <AnimatedOrb
          size={300}
          initialX={-80}
          duration={4000}
          initialY={height * 0.1}
          colors={['#F4A261', '#E76F51']}
        />

        <AnimatedOrb
          size={250}
          initialX={width - 100}
          duration={5000}
          initialY={height * 0.3}
          colors={['#E76F51', '#F4A261']}
        />

        <AnimatedOrb
          size={200}
          initialX={width * 0.3}
          duration={3500}
          initialY={height * 0.6}
          colors={['#FFD7BA', '#F4A261']}
        />

        <AnimatedOrb
          size={180}
          initialX={-50}
          duration={4500}
          initialY={height * 0.75}
          colors={['#F4B183', '#E76F51']}
        />

        <BlurView
          tint="dark"
          intensity={70}
          experimentalBlurMethod="dimezisBlurView"
          style={{ position: 'absolute', height: '100%', width: '100%' }}
        />
      </View>

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
