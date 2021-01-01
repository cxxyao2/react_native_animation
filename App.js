import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import FactCard from "./components/fact-card/index";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Fact Swipe</Text>
          <FactCard />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 30,
  },
});
