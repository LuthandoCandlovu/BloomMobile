import { Stack } from "expo-router";
import { UserProvider } from "./context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
        <Stack.Screen name="chat/bot" options={{ headerShown: false }} />
        <Stack.Screen name="transactions/details" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
