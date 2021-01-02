// transform, transformX,

import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

class App extends Component {
  animatedValue = new Animated.Value(-300);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 3000,
      useAnimatedDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loadBar}>
          <Animated.View
            style={[
              styles.loadAmount,
              { transform: [{ translateX: this.animatedValue }] },
            ]}
          />
        </View>
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
    overflow: "hidden",
  },
  loadAmount: {
    position: "absolute",
    width: 300,
    height: 40,
    backgroundColor: "red",
  },
});

export default App;
