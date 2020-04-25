import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text, Button, Dimensions, ActivityIndicator } from "react-native";
import { AppLoading } from "expo";
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard, fetchBoardSolve, validationRequest, fetchValidate } from '../store/actions/boardActions'
import { setLeaderBoard } from '../store/actions/playerActions'
import InputComponent from "../components/MaterialUnderlineTextbox1";

const screenWidth = Math.round(Dimensions.get("window").width);
  // TIMER
  const getRemaining = (time) => {
    const min = Math.floor(time / 60)
    const sec = time - min * 60
    return {min, sec}
  }
export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardReducers.board);
  const originalBoard = useSelector(
    (state) => state.boardReducers.originalBoard
  );
  const statusValidation = useSelector((state) => state.boardReducers.status);
  const playerName = useSelector((state) => state.playerReducers.name);
  const difficulties = useSelector((state) => state.boardReducers.difficulty);
  const leaderBoard = useSelector((state) => state.playerReducers.leaderBoard);
  const [remainingSec, setRemainingSec] = useState(0);
  const { min, sec } = getRemaining(remainingSec);
  const [isActive, setIsActive] = useState(true)
  let keyIndex = 1;
  // RANDOM
  const getRandomBoard = () => {
    dispatch(fetchBoard("random"));
  };
  // SOLVE
  const getBoardSolve = () => {
    dispatch(fetchBoardSolve(originalBoard));
  };

  //Validation
  const getValidation = () => {
    console.log(originalBoard);
    dispatch(validationRequest(originalBoard));
  };
  // Times
  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSec((remainingSec) => remainingSec + 1);
      }, 1000);
    } else {
      clearInterval(interval)
      setRemainingSec(0);
    }
      return () => clearInterval(interval)
  }, [remainingSec, isActive])

    useEffect(() => {
      if (statusValidation === "solved") {
        setIsActive(false)
        console.log(isActive)
        dispatch(
          setLeaderBoard({ playerName, difficulties, timesSolve: { min, sec } })
        );
        dispatch(fetchValidate(""));
        navigation.navigate("Leader Board");
      }
    }, [statusValidation]);
  
  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Let's Play
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          paddingHorizontal: 10,
          margin: 10,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 12, textAlign: "left", fontWeight: "bold" }}>
            Name : {playerName}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "left", fontWeight: "bold" }}>
            Dificulty : {difficulties}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "left", fontWeight: "bold" }}>
            Status : {statusValidation}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 15, textAlign: "left", fontWeight: "bold" }}>
            Times : {`${min}:${sec}`}
          </Text>
        </View>
      </View>
      {board.length > 0 ? (
        board.map((row, i) => {
          keyIndex++;
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "center" }}
              key={keyIndex}
            >
              {row.map((col, j) => {
                keyIndex++;
                return (
                  <InputComponent
                    key={keyIndex}
                    value={col}
                    coordinate={[i, j]}
                  />
                );
              })}
            </View>
          );
        })
      ) : (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity onPress={getRandomBoard} style={customStyles.button}>
          <Text style={customStyles.text}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getValidation} style={customStyles.button}>
          <Text style={customStyles.text}>Validate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getBoardSolve} style={customStyles.button}>
          <Text style={customStyles.text}>Solve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    width: screenWidth / 4,
    height: screenWidth / 8,
  },
  text: {
    fontSize: screenWidth / 20,
    fontWeight: "bold",
    color: "white",
  },
});
