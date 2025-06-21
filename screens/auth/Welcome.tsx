import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

import { CustomButton } from "components";
import { RootStackParamList } from "types/navigation";
import { logo_news_app, onBoarding_joinus, onBoardingImg } from "assets";

type OnBoardingItem = {
    id: number;
    title: string;
    description: string;
    images: any;
};
const onboarding: OnBoardingItem[] = [
    {
        id: 1,
        title: 'Stay Informed, Stay Empowered',
        description:
            'Welcome to our news app, your go-to source for breaking news, exclusive stories and personalize content.',
        images: logo_news_app,
    },
    {
        id: 2,
        title: 'Be a knowledgeable citizen',
        description:
            'Unlock a personalized news experience that matches your interests and preferences. Your news, your way!',
        images: onBoardingImg,
    },
    {
        id: 3,
        title: 'Elevate your news experience Now!',
        description:
            'Join our vibrant community of news enthusiasts. Share your thoughts and engage in a meaningful discussion.',
        images: onBoarding_joinus,
    },
];

type WelcomeScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Welcome'>;

const Welcome = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProps>();

    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-white ">
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                className="w-full flex justify-end items-end p-5">
                <Text className="text-black text-md font-bold">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={
                    <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
                }
                activeDot={
                    <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
                }
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map(item => (
                    <View key={item.id} className="flex items-center justify-center p-5">
                        <Image
                            source={item.images}
                            className="w-full h-[300px] rounded-2xl"
                            resizeMode="contain"
                        />
                        <View className="flex flex-row items-center justify-center w-full mt-10">
                            <Text className="text-black text-3xl font-bold text-center">
                                {item.title}
                            </Text>
                        </View>
                        <Text className="text-md font-semibold text-center text-[#6B7280] mt-3">
                            {item.description}
                        </Text>
                    </View>
                ))}
            </Swiper>

            <View className='px-2 text-center w-full'>
                <CustomButton
                    title={isLastSlide ? "Get Started" : "Next"}
                    onPress={() =>
                        isLastSlide
                            ? navigation.navigate("Login")
                            : swiperRef.current?.scrollBy(1)
                    }
                    className="w-11/12 mt-10 mb-5"
                />
            </View>
        </SafeAreaView>
    )
}

export default Welcome