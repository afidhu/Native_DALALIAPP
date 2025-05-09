
// global.WebSocket = require('react-native-websocket');
import { UserDataProvider } from "@/componets/authenticate/UserDataProcider";
import { Stack } from "expo-router";
import { StatusBar, Text } from "react-native";

export default function RootLayout() {
  return(
    <UserDataProvider>
      <StatusBar barStyle={'dark-content'} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible : false,
        }}
      />
    </UserDataProvider>
  );
}