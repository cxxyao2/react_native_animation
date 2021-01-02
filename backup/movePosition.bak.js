import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY(0, 0);
  }

  componentDidMount() {
    Animated.spring(this.position, {
      toValue: { x: 200, y: 300 },
    }).start();
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});

export default App;
