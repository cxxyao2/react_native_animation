// 2021-1-7 thursday
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableHighlight,
  Easing,
} from "react-native";
class CustomButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

//视图淡入效果
class FadeInView extends React.Component {
  state = { fadeAnim: undefined };
  constructor(props) {
    super(props);
    // 透明度为0
    this.state = { fadeAnim: new Animated.Value(0) };
  }

  componentDidMount() {
    Animated.spring(
      // 使用timing / spring / decay过渡动画
      this.state.fadeAnim, // 开启动画的值
      {
        toValue: 400, //结束值
        velocity: 100,
        tension: -4, //速度
        friction: 3,
      }
    ).start(); // 开启动画
  }

  render() {
    return (
      <Animated.View // 特殊带有动画的View视图
        style={{
          width: this.state.fadeAnim, // Binds 属性动画 width height 等
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class AnimatedDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      anim: new Animated.Value(0),
      compositeAnim: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={{ margin: 20 }}>
        <Text style={styles.welcome}>Animated使用实例</Text>
        <CustomButton
          text="动画:视图淡入效果"
          onPress={() => {
            this.setState((state) => ({ show: !state.show }));
          }}
        />
        {this.state.show && (
          <FadeInView>
            <View style={styles.content}>
              <Image
                source={require("./8.jpg")}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </FadeInView>
        )}
        <CustomButton
          text="动画:加入插值效果移动"
          onPress={() => {
            Animated.spring(this.state.anim, {
              toValue: 0,
              velocity: 7,
              tension: -20,
              friction: 3,
            }).start();
          }}
        />
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  rotate: this.state.anim.interpolate({
                    //差值动画
                    inputRange: [0, 1], // 【 0 -1 】 映射 到 【0-180】
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("./8.jpg")}
            style={{ width: 50, height: 50 }}
          />
        </Animated.View>
        <CustomButton
          text="动画:组合动画效果"
          onPress={() => {
            Animated.sequence([
              //sequence 组合动画
              Animated.timing(this.state.compositeAnim, {
                toValue: 100,
                easing: Easing.linear,
              }),
              Animated.delay(200),
              Animated.timing(this.state.compositeAnim, {
                toValue: 0,
                easing: Easing.elastic(2),
              }),
              Animated.delay(100),
              Animated.timing(this.state.compositeAnim, {
                toValue: 50,
                easing: Easing.linear,
              }),
              Animated.timing(this.state.compositeAnim, {
                toValue: 0,
                easing: Easing.elastic(1),
              }),
            ]).start();
          }}
        />
        <Animated.View
          style={[styles.content, { bottom: this.state.compositeAnim }]}
        >
          <Image
            source={require("./8.jpg")}
            style={{ width: 50, height: 50 }}
          />
        </Animated.View>{" "}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: { fontSize: 20, textAlign: "center", margin: 10 },
  button: {
    margin: 5,
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#cdcdcd",
  },
  content: {
    backgroundColor: "green",
    borderWidth: 1,
    padding: 5,
    margin: 20,
    alignItems: "center",
  },
});

export default AnimatedDemo;
