import { View, Text, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { rightArrow } from 'assets';

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
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <Text>MyProfile</Text>
        </SafeAreaProvider>
    )
}

export default MyProfile
