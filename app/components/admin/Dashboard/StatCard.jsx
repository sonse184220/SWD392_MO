import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const StatCard = ({ title, value, change, theme }) => (
  <Card style={[styles.statCard, {backgroundColor: theme.colors.surface}]}>
    <Card.Content>
      <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
      <Text variant="headlineMedium" style={styles.statNumber}>{value}</Text>
      <Text variant="bodySmall" style={styles.statChange}>{change}</Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
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
  }
});

export default StatCard;