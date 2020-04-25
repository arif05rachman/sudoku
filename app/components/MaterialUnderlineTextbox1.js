import React, { Component, useState } from "react";
import { Dimensions, StyleSheet, View, TextInput, Text } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useDispatch, useSelector } from "react-redux";
import { chageOnBoard } from "../store/actions/boardActions";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-regular": require("../assets/fonts/roboto-regular.ttf"),
    });
  };
  const screenWidth = Math.round(Dimensions.get("window").width - 20) / 9;
  const screenHeight = Math.round(Dimensions.get("window").height - 20) / 9; 
  
  function MaterialUnderlineTextbox1(props) {
    const dispatch = useDispatch()
  
  const [dataLoaded, setDataLoaded] = useState(false);
  const board = useSelector((state) => state.boardReducers.board);
    const originalBoard = useSelector((state) => state.boardReducers.originalBoard);
  const onchangeHanldle = (text, coordinate) => {
    const nums = "123456789";
    // if (text === ' ' || !nums.includes(text)) {
    //   alert("Please enter a number between 1-9!");
    // } else {
    //   console.log(text, coordinate);
    //   const newBoard = [...board];
    //   newBoard[coordinate[0]][coordinate[1]] = parseInt(text);
    //   console.log(newBoard);
    // }

    switch (text) {
      case " ":
        alert("Please enter a number between 1-9!");
        break;

      case "0":
        alert(`You can't enter 0 or zero!`);
        break;

      default:
        if (text.length > 1) {
          alert("Please enter a number between 1-9!");
        } else if (!nums.includes(text)) {
          alert("Please enter number type only!");
        } else {
          console.log(text, coordinate);
          const newBoard = [...board];
          const newOriginalBoard = { ...originalBoard }
          newOriginalBoard.board[coordinate[0]][coordinate[1]] = parseInt(text)
          newBoard[coordinate[0]][coordinate[1]].val = parseInt(text);
          // console.log(newBoard, newOriginalBoard, "BOARD INI  =====================");
          dispatch(chageOnBoard(newBoard, newOriginalBoard));
        }
        break;
    }
  }; 

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return (
    <View style={[styles.container, props.style]}>
      {props.value.val ? (
        <TextInput
          placeholder="..."
          maxLength={1}
          style={[styles.inputStyle, { backgroundColor: "#f783dc" }]}
          value={String(props.value.val)}
          editable={props.value.canChange}
          onChangeText={(text) => onchangeHanldle(text, props.coordinate)}
        />
      ) : (
        <TextInput
          placeholder="-"
          maxLength={1}
          style={[styles.inputStyle, { backgroundColor: "#c5dce0" }]}
          value=""
          editable={props.value.canChange}
          onChangeText={(text) => onchangeHanldle(text, props.coordinate)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderColor: "#000000",
    borderWidth: 1,
    height: screenWidth,
    width: screenWidth,
  },
  inputStyle: {
    width: screenWidth,
    height: screenWidth,
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    fontSize: screenWidth / 2.5,
    fontFamily: "roboto-regular",
    lineHeight: 16,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
});

export default MaterialUnderlineTextbox1;
