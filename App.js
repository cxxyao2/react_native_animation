import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import BounceBall from "./components/bounce-ball";
import LeftRightSwingCard from "./components/left-right-swing-card";
import MoveWithHand from "./components/MoveWithHand";
import AniIndifinite from "./components/AniIndifinite";

import ScaleHome from "./components/ScaleHome";

const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ScaleHome}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Bounce" component={BounceBall} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="BounceBall"
        onPress={() => navigation.navigate("Bounce")}
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});

export default App;
