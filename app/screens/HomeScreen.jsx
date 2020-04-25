import React, { useEffect } from 'react'
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import Constants from "expo-constants";

import { setPlayerName } from "../store/actions/playerActions";
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height); 
export default ({ navigation, route }) => {
  const dispatch = useDispatch()
  const playerName = useSelector(state=> state.playerReducers.name)

  const handleChangeName = name => {
    dispatch(setPlayerName(name))
  }
  const handleNextButton = () => {
    if (playerName.length < 1) {
      alert("Player name cannot be empty!");
    } else {
      navigation.navigate("Difficulty Selection");
    }
  }

  return (
    // <View style={{ paddingTop: Constants.statusBarHeight }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              margin: "10%",
            }}
          >
            <View style={customStyles.nameContainer}>
              <Text style={{fontSize: screenWidth/20, fontWeight: "bold"}}>Please type your name:</Text>
              <TextInput
                style={customStyles.nameField}
                value={playerName}
                onChangeText={(text) => handleChangeName(text)}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={handleNextButton}
                style={customStyles.nextButton}
              >
                <Text style={customStyles.nextButtonText}>Next!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const customStyles = StyleSheet.create({
  nameField: {
    width: screenWidth / 2,
    height: screenWidth / 10,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 3,
    fontSize: screenWidth / 20,
    textAlign: "center",
    margin: 20,
    padding: 8,
    borderRadius: screenWidth / 50,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    width: screenWidth / 4,
  },
  nextButtonText: {
    fontSize: screenWidth / 20,
    fontWeight: "bold",
    color: "white",
  },
  nameContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
