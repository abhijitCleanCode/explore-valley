import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// tab icons
import { home, bookmark, user, search as discover } from 'assets';
import { TabIcon } from 'components';

// main screens
import { Home, BookMark, Discover, MyProfile } from 'screens';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tabs.Navigator
            initialRouteName='home'
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    paddingBottom: 0, // for ios only
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                },
                animation: "fade",
            }}
        >
            <Tabs.Screen
                name='home'
                component={Home}
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={home} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='discover'
                component={Discover}
                options={{
                    title: "Discover",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={discover} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='bookmark'
                component={BookMark}
                options={{
                    title: "BookMark",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={bookmark} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                component={MyProfile}
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={user} focused={focused} />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

export default TabNavigator