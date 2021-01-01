import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY(0, 0);
    Animated.timing(this.position, { toValue: { x: 200, y: 300 } }).start();
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.square}></View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});
