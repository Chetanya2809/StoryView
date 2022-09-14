import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StatusList from '../storyView/StatusList';
import StoryContainer from "../storyView/StoryContainer"

const Stack = createNativeStackNavigator();
export default function MyRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="StatusList" component={StatusList} />
        <Stack.Screen name = "MyStory" component={StoryContainer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
