import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Button,
  View,
  PanResponder,
} from "react-native";

// 跟随手已移动,
// 放手回到原来位置
//
export default class BallChangeOpacity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: undefined,
    };
    this.position = new Animated.ValueXY();
    this.animatedColor = new Animated.Value(1);
  }
  componentDidMount() {
    const panResponder = PanResponder.create({
      // 要求成为响应者：
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState);
        // gestureState.move{X,Y} 是手指现在的位置
        // dx,dy累积移动距离
        //  x0,yo 移动开始时的位置
        // 以下公式大概成立
        // moveX = x0 + dx
        // moveY = yo + dy

        //Animated.parallel同时执行多个动画
        Animated.parallel([
          Animated.timing(this.position, {
            toValue: { x: gestureState.dx, y: gestureState.dy },
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(this.animatedColor, {
            toValue: 0.5,
            duration: 400,
            useNativeDriver: false,
          }),
        ]).start();
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        Animated.parallel([
          Animated.timing(this.position, {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(this.animatedColor, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]).start();
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
              opacity: this.animatedColor,
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
    backgroundColor: "blue",
    marginTop: 30,
  },
});
