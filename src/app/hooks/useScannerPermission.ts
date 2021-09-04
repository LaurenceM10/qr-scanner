import { useEffect, useState } from 'react';
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';

function useScannerPermission(): boolean | null {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestAccess = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    setHasPermission(status === PermissionStatus.GRANTED);
  };

  useEffect(() => {
    requestAccess();
  }, []);

  return hasPermission;
}

export default useScannerPermission;
