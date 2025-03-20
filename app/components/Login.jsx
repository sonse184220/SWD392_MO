import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ImageBackground, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { Text, Button, ActivityIndicator, Avatar, Surface } from 'react-native-paper';
import { Facebook, Mail, LogIn } from 'lucide-react-native';
import { auth } from "./Firebase/FirebaseConfig"; 
import GoogleConfig from './GoogleSignIn/Configure';
import GGSignIn from './GoogleSignIn/SignInFunc';

function Login({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground 
        source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f152bc62-b0d8-4103-b7db-ddc5e90db9ca" }}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.topSection}>
            <Avatar.Image 
              size={100} 
              source={{ uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/98cfb51d-6610-4d4a-bc96-e9d4006b9b07" }}
              style={styles.logo}
            />
          </View>
          
          <Surface style={styles.content}>
            <Text style={styles.title}>CITYSCOUT!</Text>
            <Text style={styles.subtitle}>EXPLORE <Text style={styles.tagline}>THE CITY</Text></Text>
            
            <Text style={styles.description}>
              Discover amazing places, find best deals, and create unforgettable memories with CityScout.
            </Text>
            
            <Button 
              mode="contained" 
              icon={({size, color}) => <Facebook size={20} color={color} />}
              style={styles.facebookButton}
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
            >
              Continue with Facebook
            </Button>

            <Button 
              mode="outlined"
              icon={({size, color}) => (
                loading ? <ActivityIndicator size={20} color="#FF475F" /> : 
                <Avatar.Image size={20} source={{ uri: "https://img.icons8.com/color/96/google-logo.png" }} />
              )}
              onPress={loginWithGG}
              disabled={loading}
              style={styles.googleButton}
              labelStyle={styles.googleButtonLabel}
              contentStyle={styles.buttonContent}
            >
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>
            
            <Button 
              mode="text"
              icon={({size, color}) => <Mail size={18} color={color} />}
              style={styles.emailButton}
              labelStyle={styles.emailButtonLabel}
            >
              Sign in with email instead
            </Button>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Text style={styles.footerLink} onPress={() => alert("Sign up coming soon!")}>
                  Sign up
                </Text>
              </Text>
            </View>
          </Surface>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    paddingTop: 60,
  },
  logo: { 
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  content: {
    alignItems: "center",
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#FF475F", 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#000",
    marginBottom: 15,
  },
  tagline: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#555" 
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  facebookButton: {
    width: "100%",
    marginVertical: 8,
    backgroundColor: "#4267B2",
    borderRadius: 12,
    elevation: 2,
  },
  googleButton: {
    width: "100%",
    marginVertical: 8,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  emailButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  buttonContent: {
    height: 50,
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  googleButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  emailButtonLabel: {
    fontSize: 14,
    color: "#FF475F",
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerLink: {
    fontWeight: "bold",
    color: "#FF475F",
  }
});

export default Login;