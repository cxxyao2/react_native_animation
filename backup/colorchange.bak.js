// 以下是展示颜色从红变绿
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

class App extends Component {
  animatedValue = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.square,
            {
              backgroundColor: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
              }),
            },
          ]}
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
  },
  square: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "green",
  },
});

export default App;
