import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";


// This runs before every route
async function middleware({ pathname }: { pathname: string }) {
    // Paths you want to allow without login
    const publicRoutes = ["/(auth)/sign-in", "/(auth)/sign-up"];

    if (publicRoutes.includes(pathname)) {
        return; // allow public pages
    }

    // Read current auth state only; avoid triggering extra fetches here to prevent races
    const { isAuthenticated } = useAuthStore.getState();

    // If still not authenticated, redirect to login
    if (!useAuthStore.getState().isAuthenticated) {
        return <Redirect href="/(auth)/sign-in"/>;
    }
}

export default middleware;
