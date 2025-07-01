import { View, Text, ImageSourcePropType, Image } from 'react-native'
import React from 'react'

interface TabIconProps { }

const TabIcon = ({ source, focused }: { source: ImageSourcePropType, focused: boolean }) => {
    return (
        <View
            className={`flex flex-row justify-center items-center`}
        >
            <View className={`rounded-full w-12 h-12 items-center justify-center`}>
                <Image
                    source={source}
                    tintColor={focused ? '#4ADE80' : '#E2E8F0'}
                    resizeMode='contain'
                    className="w-7 h-7"
                />
            </View>
        </View>
    )
}

export default TabIcon
