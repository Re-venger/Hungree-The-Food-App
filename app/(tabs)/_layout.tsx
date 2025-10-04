// app/(tabs)/_layout.tsx
import { Redirect, Slot } from "expo-router";

export default function TabsLayout() {
  const user  = true;

  // Extra safeguard: redirect if not logged in
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Render nested tab screens
  return <Slot />;
}
