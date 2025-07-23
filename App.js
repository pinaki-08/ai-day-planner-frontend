import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ClothingProductScreen from "./screens/ClothingProductScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ClothingProduct">
        <Stack.Screen name="ClothingProduct" component={ClothingProductScreen} options={{ title: "Clothing Product Analyzer" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
