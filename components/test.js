import React, { Component } from "react";
import { View, Image, Button, Text, Linking, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class TestCard extends Component {
  goToTopScrollView = () => {
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };
  render() {
    return (
      <View
        style={{
          elevation: 1,
          shadowColor: "black",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.7,
          width: wp("90%"),
          backgroundColor: "white",
        }}
      >
        <Image
          style={{ width: wp("90%"), height: hp("30%") }}
          source={{
            uri: "https://picsum.photos/300/200?image=92",
          }}
        />
        <ScrollView
          ref={(scrollViewRef) => (this.scrollView = scrollViewRef)}
          onScrollEndDrag={this.goToTopScrollView}
          height={hp("10%")}
        >
          <Text style={{ padding: 10 }}>hello world</Text>
        </ScrollView>

        <Button
          title="see the source"
          disabled={true}
          onPress={() => Linking.openURL("https://www.google.com")}
        ></Button>
      </View>
    );
  }
}
