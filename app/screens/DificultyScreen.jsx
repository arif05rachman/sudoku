import React, { useState } from "react";
import { View, Text, StyleSheet, Picker, TouchableOpacity, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoard } from "../store/actions/boardActions";

const screenWidth = Math.round(Dimensions.get("window").width);
export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.playerReducers.name);
  const [dificulty, setDificulty] = useState('easy')
  const handleDifficultyChange = (difficulty) => {
    setDificulty(difficulty)
    console.log(difficulty)
  };
  const handlePlayButton = () => {
    dispatch(fetchBoard(dificulty));
    console.log('handle button')
      navigation.navigate("Board");
  };
  // console.log(playerName)

  return (
    <View style={customStyles.difficultyContainer}>
      <Text
        style={{
          fontSize: screenWidth / 20,
          fontWeight: "bold",
          marginBottom: "10%",
        }}
      >
        Welcome to Sugoku "{playerName}"
      </Text>
      <Text style={{ fontSize: screenWidth / 25, fontWeight: "bold" }}>
        Please Select Difficulty
      </Text>
      <Picker
        selectedValue={dificulty}
        style={customStyles.difficultyPicker}
        onValueChange={(itemValue) => handleDifficultyChange(itemValue)}
      >
        <Picker.Item style={customStyles.picker} color="green" label="Easy" value="easy" />
        <Picker.Item style={customStyles.picker} color="orange" label="Medium" value="medium" />
        <Picker.Item style={customStyles.picker} color="red" label="Hard" value="hard" />
      </Picker>
      <TouchableOpacity
        style={customStyles.playButton}
        onPress={handlePlayButton}
      >
        <Text style={customStyles.playText}>Play!</Text>
      </TouchableOpacity>
    </View>
  );
};

const customStyles = StyleSheet.create({
  difficultyPicker: {
    height: screenWidth / 12,
    width: screenWidth / 2,
    margin: screenWidth / 20,
    borderColor: "#c4c4c4",
    borderWidth: 1,
    fontSize: screenWidth / 20,
    borderRadius: screenWidth / 50,
  },
  difficultyContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 20,
  },
  playText: {
    color: "white",
    fontSize: screenWidth / 20,
    width: screenWidth / 4,
    textAlign: "center",
  },
  playButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8,
  },
  picker: {
    fontSize: screenWidth / 30,
    width: screenWidth / 2,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
});