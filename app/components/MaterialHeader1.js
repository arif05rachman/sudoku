import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-regular": require("../assets/fonts/roboto-regular.ttf"),
  });
};

function MaterialHeader1(props) {
  const [dataLoaded, setDataLoaded] = useState(false)
  
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() =>  setDataLoaded(true)}
      />
    )
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.leftIconButtonRow}>
        <TouchableOpacity style={styles.leftIconButton}>
          <MaterialCommunityIconsIcon
            name="menu"
            style={styles.leftIcon2}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="Title"
            numberOfLines={1}
            style={styles.textInput}
          ></TextInput>
        </View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <TouchableOpacity style={styles.rightIconButton}>
        <MaterialCommunityIconsIcon
          name="dots-vertical"
          style={styles.rightIcon2}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    elevation: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  leftIconButton: {
    padding: 11
  },
  leftIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  },
  textWrapper: {
    alignSelf: "flex-end",
    marginLeft: 21,
    marginBottom: 14
  },
  textInput: {
    width: 37,
    height: 18,
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "roboto-regular",
    lineHeight: 18
  },
  leftIconButtonRow: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5
  },
  leftIconButtonRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconButton: {
    alignItems: "center",
    padding: 11,
    marginRight: 5,
    marginTop: 5
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 24
  }
});

export default MaterialHeader1;
