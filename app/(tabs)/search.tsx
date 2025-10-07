import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
    const { category, query } = useLocalSearchParams<{
        query: string;
        category: string;
    }>();

    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: {
            category,
            query,
            limit: 6,
        },
    });

    const { data: categories } = useAppwrite({
        fn: getCategories,
    });

    useEffect(() => {
        refetch({ category, query, limit: 6 });
    }, [category, query]);
    // console.log(data);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <View
                            className={cn(
                                "flex-1 max-w-[48%]",
                                !isFirstRightColItem ? "mt-10" : "mt-0"
                            )}
                        >
                            <MenuCard item={item as unknown as MenuItem} />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.$id.toString()}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">
                                    Search
                                </Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">
                                        Find You Fav food
                                    </Text>
                                </View>
                            </View>
                            <CartButton />
                        </View>
                        <SearchBar />
                        <Filter categories={categories!} />
                    </View>
                )}
                ListEmptyComponent={() =>
                    !loading && (
                        <View className=" w-full justify-center items-center">
                            <Image
                                source={images.emptyState}
                                resizeMode="contain"
                                className="size-64"
                            />
                            <View className="flex items-center">
                                <Text className="text-2xl h1-bold ">
                                    Nothing matched your search
                                </Text>
                                <Text className="text-lg paragraph-medium">
                                    Try a different search item or check for typos.
                                </Text>
                            </View>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default Search;
