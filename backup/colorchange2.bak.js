// 叠加两个色块，从红变绿，底色是绿色不变，红色逐渐消失
// opacity: 0，就是看不见了，完全透明了
import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

class App extends Component {
  animatedValue = new Animated.Value(1);

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.squareBG} />
        <Animated.View
          style={[styles.square, { opacity: this.animatedValue }]}
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
  squareBG: {
    width: 200,
    height: 200,
    backgroundColor: "green",
  },
  square: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
});

export default App;
