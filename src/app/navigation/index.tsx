import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import QRListScreen from 'features/qrScanner/views/QRListScreen';
import ReadQRScreen from 'features/qrScanner/views/ReadQRScreen';

// Styles
import { theme } from 'app/theme';

// Types
import { IconMap, TabIcon } from './types';

const Tab = createBottomTabNavigator();

const ICONS: IconMap = {
  'Read QR': 'scan',
  'QR List': 'md-list-sharp',
};

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: TabIcon = ICONS[route.name];

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          headerShown: false,
        })}>
        <Tab.Screen name="Read QR" component={ReadQRScreen} />
        <Tab.Screen name="QR List" component={QRListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
