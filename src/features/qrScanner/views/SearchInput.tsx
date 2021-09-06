import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Styles
import { theme } from 'app/theme';

interface InputProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onFocus?: () => void;
  autoFocus: boolean;
  placeholder: string;
}

function InputSearch({
  onChange,
  onFocus,
  autoFocus,
  placeholder,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        size={20}
        name="search"
        style={styles.icon}
        color={theme.colors.text}
      />
      <TextInput
        onFocus={onFocus}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChangeText={onChange}
        style={styles.inputText}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    paddingRight: 8,
  },
  inputText: {
    top: 2,
    flex: 1,
    padding: 0,
    color: theme.colors.text,
  },
});

export default InputSearch;
