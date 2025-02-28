import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ImageBackground, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "./Firebase/FirebaseConfig"; 
import GoogleConfig from './GoogleSignIn/Configure';
import GGSignIn from './GoogleSignIn/SignInFunc';

function Login({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (currentUser) {
        navigation.replace("HomeTabs"); // Auto-login
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const loginWithGG = async () => {
    try {
      GoogleConfig(); 
      const user = await GGSignIn();
      if (user) {
        setUser(user);
        navigation.replace("HomeTabs");
      } else {
        alert("Invalid Login!");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Sign-In Failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f152bc62-b0d8-4103-b7db-ddc5e90db9ca" }}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={styles.title}>CITYSCOUT!</Text>
          <Text style={styles.subtitle}>EXPLORE</Text>
          <Text style={styles.tagline}>THE CITY</Text>
          <Image 
            source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/98cfb51d-6610-4d4a-bc96-e9d4006b9b07" }}
            style={styles.logo}
          />
          
          <TouchableOpacity style={styles.button}>
            <Image 
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e0102072-f10e-4d23-a86c-47978320ea79" }} 
              style={styles.icon} 
            />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={loginWithGG}>
            <Image 
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/753bf365-2641-459a-8733-e6b69276d462" }} 
              style={styles.icon} 
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  content: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 32, fontWeight: "bold", color: "#000" },
  tagline: { fontSize: 18, color: "#000", marginBottom: 10 },
  logo: { width: 80, height: 80, marginBottom: 20 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    width: "90%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  icon: { width: 20, height: 20, marginRight: 10 },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

export default Login;
