import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Platform, TouchableWithoutFeedback, Animated } from "react-native";
import { 
  Provider as PaperProvider, 
  Appbar,
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
} from 'react-native-paper';
import { BlurView } from 'expo-blur';
import registerNNPushToken from "native-notify";
import { sendNotification } from "@/app/Notification/Noti";
// Import components
import Sidebar from './Sidebar/Sidebar';
import Dashboard from "./Dashboard/Dashboard";
import LocationManagement from './Location/LocationManagement';
import Category from "./Category/Category";

// Create custom light theme
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Violet
    tertiary: '#ec4899', // Pink
    background: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f8fafc',
    error: '#ef4444',
    elevation: {
      level0: 'transparent',
      level1: '#f1f5f9',
      level2: '#e2e8f0',
      level3: '#cbd5e1',
      level4: '#94a3b8',
      level5: '#64748b'
    }
  },
  roundness: 12,
  fonts: configureFonts({config: {fontFamily: 'System'}}),
};

// Create custom dark theme
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818cf8', // Lighter indigo for dark mode
    secondary: '#a78bfa', // Lighter violet for dark mode
    tertiary: '#f472b6', // Lighter pink for dark mode
    background: '#111827', // Dark blue-gray
    surface: '#1f2937', // Slightly lighter blue-gray
    surfaceVariant: '#374151',
    error: '#f87171',
    elevation: {
      level0: 'transparent',
      level1: '#1f2937',
      level2: '#374151',
      level3: '#4b5563',
      level4: '#6b7280',
      level5: '#9ca3af'
    }
  },
  roundness: 12,
  fonts: configureFonts({config: {fontFamily: 'System'}}),
};

// Menu items definition moved to constants file
import { menuItems } from './Constants';

export default function AdminPage() {
  const [sidebarVisible, setSidebarVisible] = useState(false); 
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  
  // Animation values
  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  registerNNPushToken(28377, 'Th8WOlG5eds2MxaDYrC6KT');
  // Update dimensions on screen rotation/resize
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  // Handle sidebar animation when visibility changes
  useEffect(() => {
    if (sidebarVisible) {
      // Animate sidebar in
      Animated.parallel([
        Animated.timing(sidebarAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]).start();
    } else {
      // Animate sidebar out
      Animated.parallel([
        Animated.timing(sidebarAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [sidebarVisible, sidebarAnim, opacityAnim]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  
  const handleMenuSelect = (screen) => {
    setCurrentScreen(screen);
    if (dimensions.width < 768) {
      setSidebarVisible(false);
    }
  };
  
  const closeSidebar = () => setSidebarVisible(false);

  // Calculate translateX for sidebar animation
  const translateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-280, 0]
  });

  // Get screen title for app bar
  const getScreenTitle = () => {
    const menuItem = menuItems.find(item => item.screen === currentScreen);
    return menuItem ? menuItem.name : "Admin Panel";
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard theme={theme} />;
      case "location":
        return <LocationManagement theme={theme} />;
      case "category":
        return <Category theme={theme} />;
      default:
        return <ComingSoon theme={theme} />;
    }
  };

  // Calculate main content scale for when sidebar is open (optional animation effect)
  const mainContentScale = dimensions.width >= 768 ? 1 : sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95]
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <AppHeader 
          title={getScreenTitle()} 
          toggleSidebar={toggleSidebar} 
          theme={theme} 
        />
        
        <View style={styles.content}>
          {/* Main content with animation */}
          <Animated.View style={[
            styles.mainContent,
            dimensions.width < 768 && {
              transform: [{ scale: mainContentScale }]
            }
          ]}>
            {renderScreen()}
          </Animated.View>
          
          {/* Animated Sidebar and overlay */}
          <>
            {/* Animated Sidebar */}
            <Animated.View 
              style={[
                styles.sidebarContainer,
                {
                  transform: [{ translateX }],
                  shadowColor: "#000",
                  shadowOffset: { width: 2, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                }
              ]}
              pointerEvents={sidebarVisible ? "auto" : "none"}
            >
              <Sidebar 
                active={currentScreen} 
                onSelect={handleMenuSelect} 
                onClose={closeSidebar} 
                theme={theme} 
                toggleTheme={toggleTheme}
              />
            </Animated.View>
            
            {/* Blur/Dim overlay for mobile with animation */}
            {dimensions.width < 768 && (
              <Overlay 
                visible={sidebarVisible}
                opacity={opacityAnim}
                onPress={closeSidebar}
                isDarkTheme={isDarkTheme}
              />
            )}
          </>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

// Simple header component
const AppHeader = ({ title, toggleSidebar, theme }) => (
  <Appbar.Header style={{backgroundColor: theme.colors.surface}}>
    <Appbar.Action icon="menu" onPress={toggleSidebar} />
    <Appbar.Content title={title} />
    <Appbar.Action icon="bell" onPress={sendNotification} />
    <Appbar.Action icon="account-circle" onPress={() => {}} />
  </Appbar.Header>
);

// Simple overlay component
const Overlay = ({ visible, opacity, onPress, isDarkTheme }) => (
  <Animated.View 
    style={[
      styles.overlayBase,
      { opacity }
    ]}
    pointerEvents={visible ? "auto" : "none"}
  >
    <TouchableWithoutFeedback onPress={onPress}>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <BlurView intensity={15} tint={isDarkTheme ? "dark" : "light"} style={styles.blurOverlay} />
      ) : (
        <View style={[
          styles.dimOverlay, 
          {backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)'}
        ]} />
      )}
    </TouchableWithoutFeedback>
  </Animated.View>
);

// Coming soon component for unimplemented screens
const ComingSoon = ({ theme }) => (
  <View style={[styles.comingSoon, {backgroundColor: theme.colors.background}]}>
    <Text variant="headlineMedium">Coming soon...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: { 
    flex: 1,
    position: 'relative',
  },
  mainContent: {
    flex: 1,
    zIndex: 1,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    zIndex: 10,
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  // Base for overlay animations
  overlayBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5
  },
  blurOverlay: {
    width: '100%',
    height: '100%'
  },
  dimOverlay: {
    width: '100%',
    height: '100%'
  }
});