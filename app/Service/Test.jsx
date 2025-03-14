import React, { useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import District from "../components/CityDistrict/District";
import City from "../components/CityDistrict/City";

const menuItems = [
  { name: "Dashboard", screen: "dashboard" },
  { name: "City Management", screen: "city" },
  { name: "District Management", screen: "district" },
  { name: "User Per Country", screen: "other" },
];

const Sidebar = ({ onSelect }) => (
  <View style={styles.sidebar}>
    {menuItems.map((item, index) => (
      <TouchableOpacity key={index} style={styles.menuItem} onPress={() => onSelect(item.screen)}>
        <Text style={styles.menuText}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const Dashboard = ({ toggleSidebar }) => (
  <View style={styles.dashboard}>
    <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
      <Text style={styles.toggleButtonText}>☰</Text>
    </TouchableOpacity>
    <Text style={styles.heading}>Hey, Admin</Text>
    <Text style={styles.subHeading}>Latest Registration Users: XYZ Name - xyz@gmail.com - India</Text>
    <View style={styles.chartPlaceholder}><Text>Chart Area</Text></View>
  </View>
);

export default () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const handleMenuSelect = (screen) => {
    setCurrentScreen(screen);
    setSidebarVisible(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard toggleSidebar={toggleSidebar} />;
      case "city":
        return <City />;
      case "district":
        return <District />;
      default:
        return <Text>Coming soon...</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {sidebarVisible && <Sidebar onSelect={handleMenuSelect} />}
        <FlatList
          data={[{ key: "content" }]}
          renderItem={renderScreen}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexDirection: 'row', flex: 1 },
  sidebar: { width: 220, backgroundColor: '#0D1117', padding: 15 },
  menuItem: { paddingVertical: 15 },
  menuText: { fontSize: 16, color: 'white' },
  dashboard: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' },
  subHeading: { fontSize: 16, marginBottom: 20, color: 'gray' },
  chartPlaceholder: { height: 200, backgroundColor: '#161B22', marginBottom: 20 },
  toggleButton: { padding: 10, backgroundColor: '#1F2937', borderRadius: 5, alignSelf: 'flex-start' },
  toggleButtonText: { color: 'white', fontSize: 18 },
});