import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Surface, Text, Button, Divider, List, Switch } from 'react-native-paper';
import { menuItems } from '../Constants';

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

const styles = StyleSheet.create({
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
  }
});

export default Sidebar;