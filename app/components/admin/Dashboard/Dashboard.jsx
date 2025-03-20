import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Avatar, Divider, List, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

// Components
import StatCard from './StatCard';

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
        <StatCard 
          title="Total Users" 
          value="1,248" 
          change="↑ 12% this month" 
          theme={theme} 
        />
        <StatCard 
          title="Cities" 
          value="64" 
          change="↑ 4 new" 
          theme={theme} 
        />
        <StatCard 
          title="Districts" 
          value="128" 
          change="↑ 7 new" 
          theme={theme} 
        />
      </View>
      
      <ChartCard data={data} chartConfig={chartConfig} theme={theme} />
      <RecentUsersCard theme={theme} />
    </ScrollView>
  );
};

// Chart Card Component
const ChartCard = ({ data, chartConfig, theme }) => (
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
);

// Recent Users Card Component
const RecentUsersCard = ({ theme }) => (
  <Card style={[styles.recentUsers, {backgroundColor: theme.colors.surface}]}>
    <Card.Title title="Recent Registrations" subtitle="Last 24 hours" />
    <Card.Content>
      <UserListItem 
        name="John Doe"
        email="john@example.com"
        country="United States"
        initials="JD"
        time="2h ago"
        avatarBg={theme.colors.primary}
        theme={theme}
      />
      <Divider />
      <UserListItem 
        name="Jane Smith"
        email="jane@example.com"
        country="Canada"
        initials="JS"
        time="4h ago"
        avatarBg={theme.colors.secondary}
        theme={theme}
      />
      <Divider />
      <UserListItem 
        name="Raj Patel"
        email="raj@example.com"
        country="India"
        initials="RP"
        time="8h ago"
        avatarBg={theme.colors.tertiary}
        theme={theme}
      />
    </Card.Content>
    <Card.Actions>
      <Button mode="contained-tonal">View All</Button>
    </Card.Actions>
  </Card>
);

// User List Item Component
const UserListItem = ({ name, email, country, initials, time, avatarBg, theme }) => (
  <List.Item
    title={name}
    description={`${email} - ${country}`}
    left={props => (
      <Avatar.Text 
        {...props} 
        label={initials} 
        style={{backgroundColor: avatarBg}} 
      />
    )}
    right={props => <Text {...props} style={styles.timeStamp}>{time}</Text>}
  />
);

const styles = StyleSheet.create({
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
  }
});

export default Dashboard;