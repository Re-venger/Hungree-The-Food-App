// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // This just redirects to your main tab layout
  return <Redirect href="/(tabs)" />;
}
