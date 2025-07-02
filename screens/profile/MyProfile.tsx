import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/store';
import { useLogoutMutation } from 'services/api/authApiSlice';
import { logoutUser } from 'services/state/authSlice';

import { rightArrow, user as userIcon, customize, writeStories, follow, help, about, lock, signIn } from 'assets';

type myProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyProfile'>;

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle?: string;
    tintColor?: string;
    showArrow?: boolean;
}

const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    tintColor = '',
    showArrow = true,
}: SettingsItemProps) => {
    return (
        <TouchableOpacity className='flex flex-row justify-between items-center py-3' onPress={onPress}>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='w-5 h-5 size-5' tintColor={tintColor} />
                <Text className={`text-lg font-medium text-[#252525] ${textStyle}`}>
                    {title}
                </Text>
            </View>

            {showArrow && <Image source={rightArrow} className='w-5 h-5 size-5' />}
        </TouchableOpacity>
    )
}

const MyProfile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation<myProfileScreenNavigationProp>();

    const [logout, { isLoading, isSuccess, isError, error }] = useLogoutMutation();

    const handleLogoutUser = async () => {
        try {
            const response = await logout(null);

            if (isSuccess) {
                dispatch(logoutUser());
                navigation.navigate('Register');
            }
        } catch (error) {
            console.log('screens :: profile :: MyProfile :: handleLogoutUser :: error: ', error);
        }
    }

    const genralSettings = [
        {
            icon: userIcon,
            title: 'My Info',
            onPress: () => {
                navigation.navigate('MyInfo');
            },
        },
        {
            icon: customize,
            title: 'Customize Interest',
            onPress: () => {
                navigation.navigate('CustomizeInterest');
            },
        },
        {
            icon: writeStories,
            title: 'Write Stories',
            onPress: () => {
                navigation.navigate('Create');
            },
        },
    ];

    const aboutSettings = [
        {
            icon: follow,
            title: 'Follow us on social media',
            onPress: () => { },
        },
        {
            icon: help,
            title: 'Help Center',
            onPress: () => { },
        },
        {
            icon: lock,
            title: 'Privacy Policy',
            onPress: () => { },
        },
        {
            icon: about,
            title: 'About Newsline',
            onPress: () => { },
        },
    ];

    return (
        <SafeAreaProvider className='h-full'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                <View className='w-full mt-6 mb-12'>
                    <View className="w-16 h-16 border border-secondary rounded-lg  flex justify-center items-center mx-auto">
                        <Image
                            source={{ uri: "https://cdn.leonardo.ai/users/8816dcc8-80e8-4087-b7de-295c3f7b14f8/generations/94810161-793e-4f35-8cc5-37e06595351c/segments/2:4:1/Lucid_Realism_Butterfly_Haircut_Long_Hair_for_Round_Face_Highl_1.jpg" }}
                            className="w-[90%] h-[90%] rounded-lg"
                            resizeMode="cover"
                        />
                    </View>

                    <View className='flex flex-col mt-5 pt-5'>
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-black-300 text-base font-medium">
                                General
                            </Text>
                            <View className="w-full h-[1px] bg-primary-200"></View>
                        </View>
                        {genralSettings.map((item, index) => (
                            <SettingsItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                onPress={item.onPress}
                                tintColor="#6B7280"
                            />
                        ))}
                    </View>

                    <View className="flex flex-col mt-5 pt-5">
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-black-300 text-base font-medium">
                                About
                            </Text>
                            <View className="w-full h-[1px] bg-primary-200"></View>
                        </View>
                        {aboutSettings.map((item, index) => (
                            <SettingsItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                onPress={item.onPress}
                                tintColor="#6B7280"
                            />
                        ))}
                    </View>

                    <View className="flex flex-col mt-5 pt-5">
                        <SettingsItem
                            onPress={handleLogoutUser}
                            icon={signIn}
                            title="Logout"
                            textStyle="text-danger"
                            tintColor="#F75555"
                            showArrow={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default MyProfile
