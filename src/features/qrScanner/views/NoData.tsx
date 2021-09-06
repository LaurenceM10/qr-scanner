import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Styles
import { theme } from 'app/theme';

function NoData() {
  return (
    <View testID="NoData" style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          size={32}
          name="database"
          color={theme.colors.text}
        />
        <Text style={styles.text}>There is nothing saved yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 12,
    color: theme.colors.text,
  },
});

export default NoData;
