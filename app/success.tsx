import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ImageBackground, Text, View } from "react-native";

export default function Success() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const params = useLocalSearchParams<{ from?: string }>();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/");
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return null;

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    return (
        <View className="bg-white h-full">
            <View className="w-full relative" style={{ height: 280 }}>
                <ImageBackground
                    source={images.loginGraphic}
                    className="size-full rounded-b-lg"
                    resizeMode="stretch"
                />
                <Image
                    source={images.logo}
                    className="self-center size-48 absolute -bottom-16 z-10"
                />
            </View>

            <View className="mt-24 items-center px-6">
                <Text className="text-dark-100 text-2xl font-bold">
                    {params?.from === "signup" ? "Account created!" : "Logged in!"}
                </Text>
                <Text className="text-gray-500 mt-2 text-base">
                    Redirecting you to the app...
                </Text>
            </View>
        </View>
    );
}


