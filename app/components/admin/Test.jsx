import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Dimensions, Platform, TouchableWithoutFeedback, Animated } from "react-native";
import { 
  Provider as PaperProvider, 
  Appbar, 
  Text, 
  Surface, 
  Button, 
  Card, 
  Avatar, 
  Divider,
  List,
  MD3LightTheme,
  MD3DarkTheme,
  configureFonts,
  IconButton,
  Switch,
  SegmentedButtons
} from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { BlurView } from 'expo-blur';
import District from "./Location/District";
import City from "./Location/City";
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

// Updated menu items with combined location management and added category
const menuItems = [
  { name: "Dashboard", screen: "dashboard", icon: "view-dashboard" },
  { name: "Location Management", screen: "location", icon: "map" },
  { name: "Category Management", screen: "category", icon: "shape" },
  { name: "User Per Country", screen: "other", icon: "account-group" },
];

const Sidebar = ({ active, onSelect, onClose, theme, toggleTheme }) => (
  <Surface style={styles.sidebar}>
    <View style={styles.sidebarHeader}>
      <Text variant="headlineSmall" style={styles.sidebarTitle}>Admin Panel</Text>
      {Platform.OS !== 'web' && (
        <Button 
          icon="chevron-left" 
          mode="text" 
          onPress={onClose}
          style={styles.closeButton}
        />
      )}
    </View>
    <Divider />
    <ScrollView>
      {menuItems.map((item) => (
        <List.Item
          key={item.screen}
          title={item.name}
          left={props => <List.Icon {...props} icon={item.icon} color={active === item.screen ? theme.colors.primary : theme.colors.onSurface} />}
          style={[
            styles.menuItem,
            active === item.screen && styles.activeMenuItem
          ]}
          titleStyle={[
            styles.menuText, 
            active === item.screen && {color: theme.colors.primary, fontWeight: 'bold'}
          ]}
          onPress={() => onSelect(item.screen)}
        />
      ))}
    </ScrollView>
    
    <View style={styles.themeToggleContainer}>
      <List.Item
        title="Dark Mode"
        left={props => <List.Icon {...props} icon="theme-light-dark" />}
        right={props => <Switch value={theme.dark} onValueChange={toggleTheme} />}
      />
    </View>
    
    <Divider />
    <List.Item
      title="Logout"
      left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
      style={styles.menuItem}
      titleStyle={[styles.menuText, {color: theme.colors.error}]}
      onPress={() => console.log("Logout pressed")}
    />
  </Surface>
);

const Dashboard = ({ theme }) => {
  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${theme.dark ? '129, 140, 248' : '99, 102, 241'}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${theme.dark ? '255, 255, 255' : '0, 0, 0'}, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.colors.primary
    }
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(${theme.dark ? '129, 140, 248' : '99, 102, 241'}, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <ScrollView style={[styles.dashboard, {backgroundColor: theme.colors.background}]}>
      <View style={styles.dashboardHeader}>
        <Card style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>Total Users</Text>
            <Text variant="headlineMedium" style={styles.statNumber}>1,248</Text>
            <Text variant="bodySmall" style={styles.statChange}>↑ 12% this month</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>Cities</Text>
            <Text variant="headlineMedium" style={styles.statNumber}>64</Text>
            <Text variant="bodySmall" style={styles.statChange}>↑ 4 new</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>Districts</Text>
            <Text variant="headlineMedium" style={styles.statNumber}>128</Text>
            <Text variant="bodySmall" style={styles.statChange}>↑ 7 new</Text>
          </Card.Content>
        </Card>
      </View>
      
      <Card style={[styles.chartCard, {backgroundColor: theme.colors.surface}]}>
        <Card.Title title="User Growth" subtitle="Last 6 months" />
        <Card.Content>
          <LineChart
            data={data}
            width={Dimensions.get("window").width - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>
      
      <Card style={[styles.recentUsers, {backgroundColor: theme.colors.surface}]}>
        <Card.Title title="Recent Registrations" subtitle="Last 24 hours" />
        <Card.Content>
          <List.Item
            title="John Doe"
            description="john@example.com - United States"
            left={props => (
              <Avatar.Text 
                {...props} 
                label="JD" 
                style={{backgroundColor: theme.colors.primary}} 
              />
            )}
            right={props => <Text {...props} style={styles.timeStamp}>2h ago</Text>}
          />
          <Divider />
          <List.Item
            title="Jane Smith"
            description="jane@example.com - Canada"
            left={props => (
              <Avatar.Text 
                {...props} 
                label="JS" 
                style={{backgroundColor: theme.colors.secondary}} 
              />
            )}
            right={props => <Text {...props} style={styles.timeStamp}>4h ago</Text>}
          />
          <Divider />
          <List.Item
            title="Raj Patel"
            description="raj@example.com - India"
            left={props => (
              <Avatar.Text 
                {...props} 
                label="RP" 
                style={{backgroundColor: theme.colors.tertiary}} 
              />
            )}
            right={props => <Text {...props} style={styles.timeStamp}>8h ago</Text>}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained-tonal">View All</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

// New combined Location Management component
const LocationManagement = ({ theme }) => {
  const [locationTab, setLocationTab] = useState('city');

  return (
    <View style={[styles.locationContainer, {backgroundColor: theme.colors.background}]}>
      <View style={styles.segmentedButtonContainer}>
        <SegmentedButtons
          value={locationTab}
          onValueChange={setLocationTab}
          buttons={[
            {
              value: 'city',
              icon: 'city',
              label: 'Cities',
            },
            {
              value: 'district',
              icon: 'map-marker',
              label: 'Districts',
            },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
      
      <View style={styles.locationContentContainer}>
        {locationTab === 'city' ? (
          <City theme={theme} />
        ) : (
          <District theme={theme} />
        )}
      </View>
    </View>
  );
};

export default () => {
  const [sidebarVisible, setSidebarVisible] = useState(false); 
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  
  // Animation values
  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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
        return (
          <View style={[styles.comingSoon, {backgroundColor: theme.colors.background}]}>
            <Text variant="headlineMedium">Coming soon...</Text>
          </View>
        );
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
        <Appbar.Header style={{backgroundColor: theme.colors.surface}}>
          <Appbar.Action icon="menu" onPress={toggleSidebar} />
          <Appbar.Content title={getScreenTitle()} />
          <Appbar.Action icon="bell" onPress={() => {}} />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>
        
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
                  // Add shadow for better visual separation
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
              <Animated.View 
                style={[
                  styles.overlayBase,
                  { opacity: opacityAnim }
                ]}
                pointerEvents={sidebarVisible ? "auto" : "none"}
              >
                <TouchableWithoutFeedback onPress={closeSidebar}>
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
            )}
          </>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

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
  sidebar: {
    width: 280,
    height: '100%',
    elevation: 4,
  },
  sidebarHeader: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    flexDirection: 'row'
  },
  sidebarTitle: {
    fontWeight: 'bold'
  },
  closeButton: {
    margin: 0,
    padding: 0
  },
  menuItem: { 
    marginVertical: 2,
    borderRadius: 8,
    marginHorizontal: 8
  },
  activeMenuItem: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  menuText: { 
    fontSize: 14
  },
  themeToggleContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)'
  },
  dashboard: { 
    flex: 1, 
    padding: 16
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap'
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    marginRight: 8,
    marginBottom: 8,
    elevation: 1,
    borderRadius: 12
  },
  cardTitle: {
    opacity: 0.7
  },
  statNumber: {
    fontWeight: 'bold',
    marginVertical: 4
  },
  statChange: {
    color: '#10b981' // Emerald 500
  },
  chartCard: {
    marginBottom: 16,
    elevation: 1,
    borderRadius: 12
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  recentUsers: {
    marginBottom: 16,
    elevation: 1,
    borderRadius: 12
  },
  timeStamp: {
    opacity: 0.6,
    fontSize: 12
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
  },
  // New styles for location management
  locationContainer: {
    flex: 1,
    padding: 16
  },
  segmentedButtonContainer: {
    marginBottom: 16,
    alignItems: 'center'
  },
  segmentedButtons: {
    maxWidth: 500,
    width: '100%'
  },
  locationContentContainer: {
    flex: 1
  }
});