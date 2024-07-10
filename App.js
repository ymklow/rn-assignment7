import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/Homepage';
import ProductDetail from './components/ProductDetails';
import CheckoutPage from './components/CheckoutPage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack({ refresh, refreshFlag }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage">
        {props => <HomePage {...props} refresh={refresh} refreshFlag={refreshFlag} />}
      </Stack.Screen>
      <Stack.Screen name="ProductDetail">
        {props => <ProductDetail {...props} refresh={refresh} refreshFlag={refreshFlag} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [refreshFlag, refresh] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home">
          {props => <HomeStack {...props} refresh={refresh} refreshFlag={refreshFlag} />}
        </Drawer.Screen>
        <Drawer.Screen name="Checkout">
          {props => <CheckoutPage {...props} refresh={refresh} refreshFlag={refreshFlag} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
