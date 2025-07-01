import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import './global.css';
import { BookMark, Discover, Home, Login, MyProfile, Register, Welcome } from 'screens';
import { RootStackParamList } from "types/navigation";
import { Provider } from "react-redux";
import { store } from "services/store";
import { RootState } from "types/store";
import { AuthGate, TabNavigator } from "components";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  //! it is static, use useSelector to track isAuthenticated
  // const { isAuthenticated } = store.getState().auth;

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "Tabs" : "Welcome"} screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthGate>
          <RootStack />
        </AuthGate>
      </NavigationContainer>
    </Provider>
  );
}
