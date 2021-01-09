import React, { Component } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

export default class AniIndifinite extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.spin();
  }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{ rotate: spin }],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
