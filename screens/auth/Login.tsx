import { CustomButton, InputField } from 'components';
import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'

import { envelope, lock, login_screen_news_app } from "assets";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className='relative w-full h-[250px]'>
                    <Image source={login_screen_news_app} className='z-0 w-full h-[250px]' />
                    <Text className="text-2xl text-white font-semibold absolute bottom-5 left-5">
                        Welcome 👋
                    </Text>
                </View>

                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder='Enter Email'
                        icon={envelope}
                        textContentType='emailAddress'
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder='Enter Password'
                        icon={lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <CustomButton
                        title="Login"
                        onPress={() => { }}
                        className="mt-6"
                    />

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <Text className='text-lg text-center text-general-200 mt-10'>
                            Don't have an account? <Text className='text-primary-500'>Sign Up</Text>
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login