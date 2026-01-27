import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';

// import {
//   Icon,
//   Label,
//   NativeTabs,
//   VectorIcon,
// } from 'expo-router/unstable-native-tabs';

const TabsLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 88,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#1A1A1D',
          backgroundColor: '#0D0D0F',
        },
        tabBarActiveTintColor: '#F4A261',
        tabBarInactiveTintColor: '#6B6B70',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              size={size}
              color={color}
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              size={size}
              color={color}
              name={focused ? 'person' : 'person-outline'}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

// return (
//   <NativeTabs>
//     <NativeTabs.Trigger name="index">
//       <Label>Chats</Label>
//       <Icon src={<VectorIcon family={Ionicons} name="chatbubbles" />} />
//     </NativeTabs.Trigger>

//     <NativeTabs.Trigger name="profile" options={{ selectedIconColor: 'red' }}>
//       <Icon src={<VectorIcon family={Ionicons} name="person" />} />
//     </NativeTabs.Trigger>
//   </NativeTabs>
// );
