
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/login';
import Days from './Pages/days';
import Details from './Pages/details';
import Create from './Pages/create';
import SignUp from './Pages/signup';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="Days" component={Days} />
        <Stack.Screen options={{headerShown:false}} name="Detail" component={Details} />
        <Stack.Screen options={{headerShown:false}} name="Create" component={Create} />
        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;