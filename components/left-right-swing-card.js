import React, { Component } from "react";
import { StyleSheet, View, Animated, Text, PanResponder } from "react-native";
import FactCard from "./fact-card";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CARD_X_ORIGIN = wp("5%");
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_THRESHOLD_DISTANCE = wp("-50%");
const RIGHT_THRESHOLD_DISTANCE = wp("50%");
const FACT_URL = "http://randomuselessfact.appspot.com/random.json?language=en";
const RANDOM_IMAGE_URL = "https://picsum.photos/300/200?image=";

class LeftRightSwingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panResponder: undefined,
      topFact: undefined,
      bottomFact: undefined,
    };
    this.position = new Animated.ValueXY();
  }

  componentDidMount() {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({
          x: gesture.dx,
          y: 0,
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < LEFT_THRESHOLD_DISTANCE) {
          this.forceLeftExit();
        } else if (gesture.dx > RIGHT_THRESHOLD_DISTANCE) {
          this.forceRightExit();
        } else {
          this.resetPositionSoft();
        }
      },
    });
    this.setState({ panResponder }, () => {
      axios.get(FACT_URL).then((response) => {
        this.setState({
          topFact: {
            ...response.data,
            image: this.getRandomImageURL(),
          },
        });
      });
      this.loadBottomFact();
    });
  }

  loadBottomFact() {
    axios.get(FACT_URL).then((response) => {
      this.setState({
        bottomFact: {
          ...response.data,
          image: this.getRandomImageURL(),
        },
      });
    });
  }

  getRandomImageURL() {
    return `${RANDOM_IMAGE_URL}${Math.floor(Math.random() * 500 + 1)}`;
  }

  onCartExitDone = () => {
    this.setState({ topFact: this.state.bottomFact });
    this.loadBottomFact();
    this.position.setValue({
      x: 0,
      y: 0,
    });
  };
  forceLeftExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("-100%"), y: 0 },
      useNativeDriver: false,
    }).start(this.onCartExitDone);
  }

  forceRightExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("100%"), y: 0 },
      useNativeDriver: false,
    }).start(this.onCartExitDone);
  }

  resetPositionSoft() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }
  getCardStyle() {
    const rotation = this.position.x.interpolate({
      inputRange: [MAX_LEFT_ROTATION_DISTANCE, 0, MAX_RIGHT_ROTATION_DISTANCE],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      transform: [{ rotate: rotation }],
      ...this.position.getLayout(),
    };
  }

  renderTopCard() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.getCardStyle()}
      >
        <FactCard disabled={false} fact={this.state.topFact} />
      </Animated.View>
    );
  }

  renderBottomCard() {
    return (
      <View style={{ zIndex: -1, position: "absolute" }}>
        <FactCard disabled={true} fact={this.state.bottomFact} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fact Swipe</Text>
        <View>
          {this.state.topFact && this.renderTopCard()}
          {this.state.bottomFact && this.renderBottomCard()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
  },
});

export default LeftRightSwingCard;
