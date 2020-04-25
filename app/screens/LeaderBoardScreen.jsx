import React, { useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Tab,
  FlatList
} from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

// import { setPlayerName } from "../store/actions/playerActions";
import { fetchBoard } from "../store/actions/boardActions";
import { DrawerActions } from "@react-navigation/native";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
export default ({ navigation, route }) => {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.playerReducers.name);
  const leaderBoard = useSelector((state) => state.playerReducers.leaderBoard);
  const difficulty = useSelector((state) => state.boardReducers.difficulty);
  
  // BACK TO DIFFICULT MENU
  const backToDifficulty = () => {
    navigation.navigate("Difficulty Selection");
  }
  const tryAgain = () => {
    navigation.navigate("Board");
    dispatch(fetchBoard(difficulty));
  }
  if (!leaderBoard.length) {
    return (
      <View >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Leader Board
        </Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>NO</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Difficulty</DataTable.Title>
            <DataTable.Title>Times</DataTable.Title>
          </DataTable.Header>
          {leaderBoard && leaderBoard.map((dataPlayer, idx)=> {
            return (
              <DataTable.Row>
                <DataTable.Cell>{idx + 1}</DataTable.Cell>
                <DataTable.Cell>{dataPlayer.playerName}</DataTable.Cell>
                <DataTable.Cell>{dataPlayer.difficulties}</DataTable.Cell>
                <DataTable.Cell>{`${dataPlayer.timesSolve.min} : ${dataPlayer.timesSolve.sec}`}</DataTable.Cell>
              </DataTable.Row>
            );
          })
          }
        </DataTable>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
          <TouchableOpacity onPress={backToDifficulty} style={styles.button}>
            <Text style={styles.text}>Back To Difficulty</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={tryAgain} style={styles.button}> */}
            {/* <Text style={styles.text}>Try Again</Text> */}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: screenWidth / 20,
    fontWeight: "bold",
    color: "white",
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
