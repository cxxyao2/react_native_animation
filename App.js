import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import BounceBall from "./components/bounce-ball";
import LeftRightSwingCard from "./components/left-right-swing-card";
import MoveWithHand from "./components/MoveWithHand";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BounceBall />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default App;
