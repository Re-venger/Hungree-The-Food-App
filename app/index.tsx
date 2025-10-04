// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  const user = false // user is null if not authenticated

  // Redirect to sign-in if not logged in
  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Otherwise, go to tabs
  return <Redirect href="/(tabs)" />;
}
