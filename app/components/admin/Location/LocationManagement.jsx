import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

// Import location components
import City from './City';
import District from './District';

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

const styles = StyleSheet.create({
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

export default LocationManagement;