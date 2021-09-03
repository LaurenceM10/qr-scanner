import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Styles
import { theme } from 'app/theme';

function QRListScreen() {
  return <SafeAreaView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default QRListScreen;
