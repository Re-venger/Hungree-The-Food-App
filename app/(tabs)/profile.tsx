import { images } from "@/constants";
import { account } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable component for each detail row to keep the code clean
const ProfileDetailRow = ({ icon, label, value }: any) => (
    <View>
        <View className="flex-row items-center gap-x-5">
            <Image source={icon} className="size-8" resizeMode="contain" />
            <View>
                <Text className="text-gray-500 text-base font-regular">
                    {label}
                </Text>
                <Text className="text-dark-100 text-lg font-semibold">
                    {value}
                </Text>
            </View>
        </View>
        {label !== "Address 2 - (Work)" && (
            <View className=" bg-gray-200 my-4 ml-14" />
        )}
    </View>
);

const Profile = () => {
    const { user, setIsAuthenticated, setUser } = useAuthStore();

    // Mock data to match the design, replace with your actual user data
    const profileData = {
        name: user?.name || "Adrian Hajdin",
        email: user?.email || "adrian@jsmastery.com",
        phone: "+1 555 123 4567",
        address1: "123 Main Street, Springfield, IL 62704",
        address2: "221B Rose Street, Foodville, FL 12345",
    };

    const handleLogout = async () => {
        try {
            console.log("clicked");
            await account.deleteSessions();
            setUser(null);
            setIsAuthenticated(false);
            await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.log(error);
            throw new Error(error as string);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row pt-5 px-5 justify-between items-center">
                    <TouchableOpacity>
                        <Image source={images.arrowBack} className="size-6" />
                    </TouchableOpacity>
                    <Text className="text-dark-100 text-xl font-psemibold capitalize">
                        Profile
                    </Text>
                    <TouchableOpacity>
                        <Image source={images.search} className="size-6" />
                    </TouchableOpacity>
                </View>

                {/* Profile Picture Section */}
                <View className="items-center mt-6 py-5">
                    <View>
                        <Image
                            source={{ uri: user?.avatar }}
                            className="size-36 rounded-full border-4 border-white"
                            resizeMode="cover"
                        />
                        {/* Edit Icon */}
                        <TouchableOpacity className="absolute bottom-1 right-1 bg-[#FFC107] p-2 rounded-full">
                            <Image source={images.pencil} className="size-5" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Details Card */}
                <View className="bg-white rounded-3xl mx-5 p-6 mt-4 shadow-md">
                    <ProfileDetailRow
                        icon={images.user}
                        label="Full Name"
                        value={user?.name}
                    />
                    <ProfileDetailRow
                        icon={images.envelope}
                        label="Email"
                        value={user?.email}
                    />
                    <ProfileDetailRow
                        icon={images.phone}
                        label="Phone number"
                        value={user?.phone_num}
                    />
                    <ProfileDetailRow
                        icon={images.location}
                        label="Address 1 - (Home)"
                        value={profileData.address1}
                    />
                    <ProfileDetailRow
                        icon={images.location}
                        label="Address 2 - (Work)"
                        value={profileData.address2}
                    />
                </View>

                {/* Action Buttons */}
                <View className="mt-8 p-6 pb-10 flex flex-row gap-2 w-full items-center">
                    <TouchableOpacity className="bg-[#FFD482] rounded-md py-4 items-center justify-center w-1/2">
                        <Text className="text-dark-100 text-lg font-semibold">
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-1/2 border-2 border-red-500 rounded-md py-4 flex-row items-center justify-center gap-x-2"
                        onPress={handleLogout}
                    >
                        <Image source={images.logout} className="size-4" />
                        <Text className="text-red-500 text-lg font-semibold">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
