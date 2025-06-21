import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { envelope, lock, login_screen_news_app, user } from "assets";
import { CustomButton, InputField } from "components";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={login_screen_news_app} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-semibold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                </View>

                <View className="py-5">
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={user}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={envelope}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <CustomButton
                        title="Create Account"
                        onPress={() => Alert.alert("Register")}
                        className="mt-6"
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default Register