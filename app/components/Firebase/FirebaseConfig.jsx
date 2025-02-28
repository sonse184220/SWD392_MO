import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyClNZ2okk2B7H4vX47VGNrPY6-RpFQkGT8",
    authDomain: "cityscout-264ae.firebaseapp.com",
    projectId: "cityscout-264ae",
    storageBucket: "cityscout-264ae.firebasestorage.app",
    messagingSenderId: "514233620451",
    appId: "1:514233620451:web:d4620dadd049e54b47b2d6",
    measurementId: "G-NCXCWE1L5K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
