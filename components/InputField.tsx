import { eye, eyehide } from 'assets';
import { useState } from 'react'
import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableOpacity,
} from 'react-native'

import { InputFieldProps } from 'types/type'

const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='my-2 w-full'>
                    <Text className={`text-lg font-semibold mb-3 ${labelStyle}`}>
                        {label}
                    </Text>

                    <View
                        className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
                    >
                        {icon && (
                            <Image
                                source={icon}
                                className={`w-6 h-6 ml-4 ${iconStyle}`}
                            />
                        )}
                        <TextInput
                            className={`rounded-full p-4 font-semibold text-[15px] flex-1 ${inputStyle} text-left`}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />

                        {label === 'Password' && (
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Image
                                    source={showPassword ? eyehide : eye}
                                    className='w-6 h-6 mr-4'
                                    resizeMode='contain'
                                    tintColor='#6B7280'
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* {error && <Text className='text-red-500'>{error}</Text>} */}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField