import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Button,
  View,
  PanResponder,
} from "react-native";

export default class MoveWithHand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchViewMove: { x: new Animated.Value(0), y: new Animated.Value(0) },
    };
  }
  componentDidMount() {}
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        Animated.parallel([
          //Animated.parallel同时执行多个动画
          Animated.timing(this.state.touchViewMove.x, {
            toValue: gestureState.dx,
            duration: 0,
          }),
          Animated.timing(this.state.touchViewMove.y, {
            toValue: gestureState.dy,
            duration: 0,
          }),
        ]).start();
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        Animated.parallel([
          Animated.timing(this.state.touchViewMove.x, {
            toValue: 0,
            easing: Easing.bounce,
            duration: 400,
          }),
          Animated.timing(this.state.touchViewMove.y, {
            toValue: 0,
            easing: Easing.bounce,
            duration: 400,
          }),
        ]).start();

        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  render() {
    const { touchViewMove } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="out"
          onPress={() => {
            alert(2); //这里弹出2
          }}
        ></Button>
        <Animated.View
          style={[
            styles.touchView,
            {
              transform: [
                { translateX: touchViewMove.x },
                { translateY: touchViewMove.y },
              ],
            },
          ]}
          {...this._panResponder.panHandlers}
        >
          <Button
            title="click"
            onPress={() => {
              alert(1); //这里不会弹出1
              //注意！！！！！！！！panResponder中的onPress都不会触发，这时就要设置在触摸距离大于某个范围时在触发移动
            }}
          ></Button>
        </Animated.View>
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
