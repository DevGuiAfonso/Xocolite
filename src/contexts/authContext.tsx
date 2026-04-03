import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AUTH_STORAGE_KEY = "@myapp:auth-state";

export const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  async function storageState(newState: { isLoggedIn: boolean }) {
    try {
      await AsyncStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(newState)
      );
    } catch (error) {
      console.log("ERRO_SET_STORAGE_AUTH", error);
    }
  }

  function signIn() {
    setIsLoggedIn(true);
    storageState({ isLoggedIn: true });
  }

  function signOut() {
    setIsLoggedIn(false);
    storageState({ isLoggedIn: false });
  }

  useEffect(() => {
    async function loadAuthState() {
      try {
        const storedState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        const state = storedState ? JSON.parse(storedState) : null;

        console.log("STORAGE =>", state);

        setIsLoggedIn(state?.isLoggedIn ?? false);
      } catch (error) {
        console.log("ERRO_GET_STORAGE_AUTH", error);
        setIsLoggedIn(false);
      } finally {
        setIsReady(true);
      }
    }

    loadAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, signIn, signOut, isReady }}
    >
      {children}
    </AuthContext.Provider>
  );
}