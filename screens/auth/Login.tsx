import { useState } from 'react'
import { Alert, Image, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';

import { CustomButton, InputField } from 'components';
import { envelope, lock, login_screen_news_app } from "assets";
import { RootStackParamList } from 'types/navigation';
import { useLoginMutation } from 'services/api/authApiSlice';

type loginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

interface LoginFormData {
    email: string,
    password: string
}

const Login = () => {
    const navigation = useNavigation<loginScreenNavigationProp>();

    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

    const handleUserLogin = async function (data: LoginFormData) {
        try {
            const response = await login(data).unwrap();

            console.log("screens :: auth :: login :: login :: handleUserLogin :: response: ", response);

            if (isSuccess) {
            }
        } catch (error) {
            console.log("screens :: auth :: login :: login :: handleUserLogin :: error: ", error);
        }
    }

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
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        // validationSchema={}
                        onSubmit={(values) => handleUserLogin(values)}>
                        {({ handleChange, handleBlur, handleSubmit, values,
                            errors, touched,
                            setFieldValue,
                        }) => (
                            <>
                                <InputField
                                    label="Email"
                                    placeholder='Enter Email'
                                    icon={envelope}
                                    textContentType='emailAddress'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                <InputField
                                    label="Password"
                                    placeholder='Enter Password'
                                    icon={lock}
                                    secureTextEntry={true}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />

                                <CustomButton
                                    onPress={handleSubmit}
                                    title="Login"
                                    className="mt-6"
                                />
                            </>
                        )}
                    </Formik>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")}>
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
