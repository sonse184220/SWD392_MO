import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Blog() {
  const [textInput1, setTextInput1] = useState("");
  const [textInput2, setTextInput2] = useState("");
  const images = [
    { id: "99909000-4823-4cf7-b36a-3d09eb445b17", label: "Budget Travel" },
    { id: "cf6a6ce5-188a-4827-801d-4fb6db1266a7", label: "First-time Abroad" },
    { id: "d19df493-c7b1-431f-a553-1c771fc7a4c5", label: "Safe Travel" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Blogs</Text>
        <View style={styles.row}>
          <Text style={styles.text2}>Might need these</Text>
          <Text style={styles.text3}>See all</Text>
        </View>
        <View style={styles.row2}>
          {images.map(({ id, label }, i) => (
            <ImageBackground
              key={i}
              source={{ uri: `https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/${id}` }}
              style={styles.view}
            >
              <Text style={styles.text4}>{label}</Text>
            </ImageBackground>
          ))}
        </View>
        <TextInput placeholder="A country, a city, a place..." value={textInput1} onChangeText={setTextInput1} style={styles.input} />
        <View style={styles.row4}>
          {["Sightseeing", "Resort"].map((label, i) => (
            <TouchableOpacity key={i} style={styles.buttonRow} onPress={() => alert("Pressed!")}> 
              <Text style={styles.text5}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TextInput placeholder="Restaurant" value={textInput2} onChangeText={setTextInput2} style={styles.input2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollView: { flex: 1, padding: 20 },
  text: { fontSize: 30, fontWeight: "bold" },
  text2: { fontSize: 20, fontWeight: "bold" },
  text3: { fontSize: 14, fontWeight: "bold", color: "#FF475F" },
  text4: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
  text5: { fontSize: 16, fontWeight: "bold", color: "#0048F0" },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  row2: { flexDirection: "row", justifyContent: "space-between" },
  row4: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  buttonRow: { padding: 10, borderRadius: 50, borderWidth: 1 },
  input: { fontSize: 16, padding: 10, borderWidth: 1, marginVertical: 10 },
  input2: { fontSize: 16, fontWeight: "bold", padding: 10, borderWidth: 1 },
  view: { width: 100, height: 120, justifyContent: "center", alignItems: "center" },
});
