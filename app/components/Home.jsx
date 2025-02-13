import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, ImageBackground, StyleSheet } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <ImageBackground source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c5917766-b5b4-4086-9c6c-1defdb813e01" }} resizeMode="stretch" style={styles.absoluteColumn}>
            <Text style={styles.text6}>Bạn muốn đi đâu vậy? Có CityScout lo !</Text>
            <View style={styles.row4}>
              <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8552bd13-a013-4399-9aa7-5f1124f3f6c4" }} resizeMode="stretch" style={styles.image7} />
              <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c722e833-d862-40a4-a2fb-1662fd864376" }} resizeMode="stretch" style={styles.image7} />
              <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/34c7f0a7-9798-4159-a17d-85167e84ce59" }} resizeMode="stretch" style={styles.image7} />
              <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c9651aee-115a-4943-b2b4-935e973be305" }} resizeMode="stretch" style={styles.image7} />
            </View>
          </ImageBackground>
        <View>
          <View style={styles.column}>
            <Text style={styles.text}>DEAL HOT HÔM NAY!</Text>
            <View style={styles.row}>
              <Text style={styles.text2}>All</Text>
              <Text style={styles.text3}>Flights</Text>
              <Text style={styles.text4}>Hotels</Text>
              <Text style={styles.text5}>Transportations</Text>
            </View>
            <View style={styles.box} />
            <Image source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7905bd14-754a-4073-ae45-9574481b6ef9" }} resizeMode="stretch" style={styles.image} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  column: {
    alignItems: "flex-start",
    backgroundColor: "#FFF9F9",
    padding: 20,
  },
  text: {
    color: "#181A24",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text2: {
    color: "#FF475F",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  text3: {
    color: "#C1C4D6",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  text4: {
    color: "#C1C4D6",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  text5: {
    color: "#C1C4D6",
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    width: 30,
    height: 2,
    backgroundColor: "#FF475F",
    marginBottom: 20,
  },
  image: {
    borderRadius: 6,
    width: "100%",
    height: 140,
    marginBottom: 8,
  },
  absoluteColumn: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  text6: {
    color: "#FBFCFC",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row4: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  image7: {
    width: 64,
    height: 64,
  },
});
