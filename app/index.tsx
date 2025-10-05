// app/index.tsx
import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const {isAuthenticated, isLoading}  = useAuthStore();// user is null if not authenticated

  if(isLoading) return null;
  // Redirect to sign-in if not logged in
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  // Otherwise, go to tabs
  return <Redirect href="/(tabs)" />;
}
