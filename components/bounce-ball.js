import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Button,
  View,
  PanResponder,
} from "react-native";

export default class BounceBall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: undefined,
    };
    this.position = new Animated.ValueXY();
  }
  componentDidMount() {
    const panResponder = PanResponder.create({
      // 要求成为响应者：
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        Animated.parallel([
          //Animated.parallel同时执行多个动画
          Animated.timing(this.position, {
            toValue: { x: gestureState.dx, y: gestureState.dy },
            duration: 0,
          }),
        ]).start();
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();

        // 一般来说这意味着一个手势操作已经成功完成。
      },
    });
    this.setState({ panResponder });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.touchView,
            {
              transform: this.position.getTranslateTransform(),
            },
          ]}
          {...this.state.panResponder?.panHandlers}
        ></Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "yellow",
    marginTop: 30,
  },
});
