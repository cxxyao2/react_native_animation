import React, { Component } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Button,
  View,
  PanResponder,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const HALF_SCREEN_WIDTH = "50%";
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_THRESHOLD_DISTANCE = wp("-50%");
const RIGHT_THRESHOLD_DISTANCE = wp("50%");
const CIRCLE_SIZE = 100;

// 跟随手已移动,
// 放手回到原来位置
// 过了中线,右边变红,左边变蓝
export default class BounceBall extends Component {
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
        // gestureState.move{X,Y} 是手指现在的位置
        // dx,dy累积移动距离
        //  x0,yo 移动开始时的位置
        // 以下公式大概成立
        // moveX = x0 + dx
        // moveY = yo + dy
        // Animated.timing,Animated.spring 等都是推动值的变化
        // 具体object怎么动起来,设定在style中的transition,opacity,color之类
        let aniColor;
        if (gestureState.dx - CIRCLE_SIZE / 2 < LEFT_THRESHOLD_DISTANCE) {
          aniColor = 0;
        } else if (
          gestureState.dx + CIRCLE_SIZE / 2 >
          RIGHT_THRESHOLD_DISTANCE
        ) {
          aniColor = 1;
        } else {
          aniColor = 0.3;
        }

        //Animated.parallel同时执行多个动画
        Animated.parallel([
          Animated.timing(this.position, {
            toValue: { x: gestureState.dx, y: gestureState.dy },
            duration: 100,
            useNativeDriver: false,
          }),
          Animated.timing(this.animatedColor, {
            toValue: aniColor,
            duration: 100,
            easing: Easing.linear,
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
          // Animated.timing(this.animatedColor, {
          //   toValue: 0.5,
          //   duration: 0,
          //   useNativeDriver: false,
          // }),
        ]).start();
      },
    });
    this.setState({ panResponder });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundView}>
          <View style={styles.leftView}></View>
          <View style={styles.rightView}></View>
        </View>
        <Animated.View
          style={[
            styles.touchView,
            {
              transform: this.position.getTranslateTransform(),
              backgroundColor: this.animatedColor.interpolate({
                inputRange: [0, 0.3, 0.5, 1],
                outputRange: ["red", "yellow", "blue", "black"],
              }),
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
  backgroundView: {
    flex: 1,
    width: "100%",
    height: hp("100%"),
    flexDirection: "row",
    position: "absolute",
  },
  touchView: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "red",
    marginTop: 30,
  },
  leftView: {
    width: HALF_SCREEN_WIDTH,
    height: hp("100%"),
    flex: 1,
    backgroundColor: "green",
  },
  rightView: {
    width: HALF_SCREEN_WIDTH,
    height: hp("100%"),
    flex: 1,
    backgroundColor: "white",
  },
});
