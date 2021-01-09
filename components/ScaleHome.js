import React, { Component } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  View,
  Animated,
  Platform,
  StyleSheet,
  Easing,
  Text,
  Image,
} from "react-native";

// TODO, 待定
export default class ScaleHome extends Component {
  constructor(props) {
    super(props);
    //初始化两个变量,一个用于操作scale，一个用于操作opacity.
    this.state = {
      scaleAniValue: new Animated.Value(2),
      opacityAnimValue: new Animated.Value(1),
      splashed: false,
    };
  }

  componentDidMount() {
    //第一参数是要修改的变量，第二个是配置config，
    // 效果是：1，opacity变,模糊变清晰 2,突然变大
    // opacity: 0 看不见 1完全可见
    Animated.timing(this.state.scaleAniValue, {
      toValue: 1,
      duration: 1200,
      delay: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.props.navigation.navigate("Bounce");
    });
    Animated.timing(this.state.opacityAnimValue, {
      toValue: 0,
      duration: 400,
      delay: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => this.setState({ splashed: true }));

    // this.state.scaleAniValue.addListener((value) => {
    //   if (value.value == "0.8") {
    //     this.props.onAnimEnd();
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Animated.Image
            source={require("./home.jpg")}
            style={{
              flex: 1,
              height: hp("100%"),
              position: "absolute",
              width: wp("100%"),
              height: hp("100%"),
              transform: [{ scale: this.state.scaleAniValue }],
            }}
          />
        </View>

        {this.state.splashed ? null : (
          <View
            style={[
              styles.container,
              { position: "absolute", height: hp("100%") },
            ]}
          >
            <Animated.Image
              source={require("./splash.jpg")}
              style={{
                flex: 1,
                height: hp("100%"),
                position: "absolute",
                width: wp("100%"),
                height: hp("100%"),
                opacity: this.state.opacityAnimValue,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    height: Platform.OS === "android" ? hp("100%") - 24 : hp("100%"),
    width: wp("100%"),
    position: "absolute",
  },
});
