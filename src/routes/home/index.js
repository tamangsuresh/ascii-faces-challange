import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../../screens/home';
import React from 'react';

const Stack = createStackNavigator();

export const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Buy Asci Faces" component={Home} />
    </Stack.Navigator>
  );
};
