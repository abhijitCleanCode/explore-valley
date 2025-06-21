import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import './global.css';
import { BookMark, Discover, Home, Login, MyProfile, Register, Welcome } from 'screens';
import { RootStackParamList } from "types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {

  return (
    <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="BookMark" component={BookMark} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
