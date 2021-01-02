// width
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

class App extends Component {
  animatedValue = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 300,
      duration: 3000,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loadBar} />
        <Animated.View
          style={[styles.loadAmount, { width: this.animatedValue }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  loadBar: {
    width: 300,
    height: 40,
    backgroundColor: "white",
  },
  loadAmount: {
    position: "absolute",
    width: 0,
    height: 40,
    backgroundColor: "red",
  },
});

export default App;
