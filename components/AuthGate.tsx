import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from 'services/state/authSlice';
import { useLazyGetCurrentUserQuery } from 'services/api/authApiSlice';
import { View, Text } from 'react-native';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const [triggerGetUser, { isFetching }] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        async function init() {
            try {
                // trigger this fn on app load and take adv of appwrite
                const user = await triggerGetUser(null).unwrap();
                dispatch(setUser(user));
            } catch (error) {
                dispatch(logout());
            }
        }

        init();
    }, [])

    if (isFetching) {
        // better ux display splash screen
        return (
            <View className='flex-1 justify-center items-center'>
                <Text>Fetching User</Text>
            </View>
        );
    }

    return (
        <>{children}</>
    )
}

export default AuthGate
