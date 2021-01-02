import React, { Component } from "react";
import { View, Image, Button, Text, Linking, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class FactCard extends Component {
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

        <Text style={{ padding: 10 }}>aaaaaa,dddd,aaaa</Text>

        <Button
          title="see the source"
          disabled={false}
          onPress={() => console.log("todo press")}
        ></Button>
      </View>
    );
  }
}
