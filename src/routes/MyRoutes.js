import React from 'react';
import StatusList from '../storyView/StatusList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function MyRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="StatusList" component={StatusList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
