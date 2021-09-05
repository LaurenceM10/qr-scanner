import React, { useState } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

// Styles
import { theme } from 'app/theme';

// Utils/Hooks
import useScannerPermission from 'app/hooks/useScannerPermission';

// Redux
import { useAppDispatch } from 'app/store';
import { addQR } from 'features/qrScanner/slice';

function ReadQRScreen() {
  const dispatch = useAppDispatch();
  const hasPermission = useScannerPermission();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult) => {
    setScanned(true);

    showConfirmAlert(`Do you want to save ${data}?`, () => {
      dispatch(addQR({ id: Date.now(), content: data }));
    });
  };

  const showConfirmAlert = (message: string, handleSave: () => void) => {
    Alert.alert('Scanned Successfully', message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Save', onPress: handleSave },
    ]);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionError}>
          Requesting for camera permission
        </Text>
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionError}>No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <View style={styles.scanButtonContainer}>
            <TouchableHighlight
              onPress={() => setScanned(false)}
              style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan Again</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  scannerContainer: {
    width: 350,
    height: 560,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondaryBackground,
  },
  scanner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionError: {
    fontSize: 16,
    color: theme.colors.text,
  },
  scanButtonContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  scanButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.background,
  },
  scanButtonText: {
    fontSize: 16,
    color: theme.colors.accent,
  },
});

export default ReadQRScreen;
