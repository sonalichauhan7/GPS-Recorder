import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreens } from '../constants/app.screens';
import { Dashboard } from '../screens/Dashboard';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AppScreens.Dashboard}>
                <Stack.Screen name={AppScreens.Dashboard} component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};