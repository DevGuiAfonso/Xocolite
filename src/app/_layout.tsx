import { AuthProvider } from "@/contexts/authContext";
import { CartProvider } from "@/contexts/cartContext";

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // IMPORTANTE

import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootNavigation() {
  const { isLoggedIn, isReady } = useAuth();
  const segments = useSegments();

  const inAuthRoute = segments[0] === "signIn";

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  //  só redireciona se NÃO estiver na tela de login
  if (!isLoggedIn && !inAuthRoute) {
    return <Redirect href="/signIn" />;
  }

  //  se estiver logado e ainda estiver no login → manda pro app
  if (isLoggedIn && inAuthRoute) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="signIn" />
    </Stack>
  );
}
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      {/* 2. O ModalProvider gerencia a renderização dos modais sobre as telas */}
      <BottomSheetModalProvider>
        
        <AuthProvider>
          <CartProvider>
            <RootNavigation />
          </CartProvider>
        </AuthProvider>

      </BottomSheetModalProvider>
      
    </GestureHandlerRootView>
  );
}