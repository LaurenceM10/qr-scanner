import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
} from 'react-native';
import SearchInput from 'features/qrScanner/views/SearchInput';

// Styles
import { theme } from 'app/theme';

// Redux
import { useAppSelector } from 'app/store';
import { RootState } from 'app/store/store';
import { QRItem } from 'features/qrScanner/slice/types';

function QRListScreen() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const QRList = useAppSelector((state: RootState) => {
    const { QRData } = state.QRReducer;
    const parsedSearchTerm = searchTerm.toLowerCase();

    if (parsedSearchTerm.length) {
      return QRData.filter(
        str => str.content.toLowerCase().indexOf(parsedSearchTerm) !== -1,
      );
    }

    return QRData;
  });

  const renderItem: ListRenderItem<QRItem> = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.qrContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onChange={setSearchTerm} autoFocus={false} />
      </View>
      <FlatList
        data={QRList}
        style={styles.list}
        renderItem={renderItem}
        keyExtractor={item => `row-${item.id}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 40,
  },
  searchContainer: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
  list: {
    flex: 1,
  },
  listItem: {
    elevation: 2,
    borderRadius: 4,
    marginVertical: 4,
    paddingVertical: 12,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.background,
  },
  qrContent: {
    color: theme.colors.accent,
  },
});

export default QRListScreen;
