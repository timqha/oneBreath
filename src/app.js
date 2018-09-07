// @flow

import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

/* METHODS */
import Timer from 'src/containers/timer';

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default () => (
  <View style={styles.container}>
    <Timer />
  </View>
);
