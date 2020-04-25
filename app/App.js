import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import store from "./store";

// COMPONENT
import HeaderComponent from "./components/MaterialHeader1";
// import InputComponent from "./components/MaterialUnderlineTextbox1";
// SCREEN
import HomeScreen from './screens/HomeScreen'
import DificultyScreen from "./screens/DificultyScreen";
import BoardScreen from "./screens/BoardScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Difficulty Selection"
            component={DificultyScreen}
          />
          <Stack.Screen name="Board" component={BoardScreen} />
          <Stack.Screen name="Leader Board" component={LeaderBoardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <View style={{ paddingTop: Constants.statusBarHeight }}>
        <HeaderComponent />
        <BoardComponent />
      </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
    borderWidth: 1,
    borderColor: "black"
  },
});
