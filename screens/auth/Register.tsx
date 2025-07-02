import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';

import { envelope, lock, login_screen_news_app, user } from "assets";
import { CustomButton, InputField } from "components";
import { RootStackParamList } from "types/navigation";
import { useCreateUserMutation } from "services/api/authApiSlice";

type registerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

const getErrorMessage = (error: any) => {
    const message = error?.message || "Something went wrong";
    return message.replace(/^AppwriteException:\s*/, "");
}

const Register = () => {
    const navigation = useNavigation<registerScreenNavigationProp>();

    const [createUser, { isLoading, isSuccess, isError, error }] = useCreateUserMutation();

    const handleUserRegister = async function (data: RegisterFormData) {
        try {
            const response = await createUser(data).unwrap();

            console.log("screens :: auth :: register :: register :: handleUserRegister :: response: ", response);

            navigation.navigate("Tabs")
        } catch (error) {
            console.log("screens :: auth :: register :: register :: handleUserRegister :: error: ", error);
            const message = getErrorMessage(error);
            Alert.alert("Error", message);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView className="flex-1 bg-white">
                <View className="flex-1 bg-white">
                    <View className="relative w-full h-[250px]">
                        <Image source={login_screen_news_app} className="z-0 w-full h-[250px]" />
                        <Text className="text-2xl text-white font-semibold absolute bottom-5 left-5">
                            Create Your Account
                        </Text>
                    </View>

                    <View className="p-5">
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                            }}
                            // validationSchema = {}
                            onSubmit={(values) => handleUserRegister(values)}
                        >
                            {({ handleSubmit, handleBlur, handleChange, values, errors, touched, setFieldValue }) => (
                                <>
                                    <InputField
                                        label="Name"
                                        placeholder="Enter name"
                                        icon={user}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                    />
                                    <InputField
                                        label="Email"
                                        placeholder="Enter email"
                                        icon={envelope}
                                        textContentType="emailAddress"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                    <InputField
                                        label="Password"
                                        placeholder="Enter password"
                                        icon={lock}
                                        secureTextEntry={true}
                                        textContentType="password"
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />

                                    <CustomButton
                                        onPress={handleSubmit}
                                        title="Create Account"
                                        className="mt-6"
                                    />
                                </>
                            )
                            }
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register
