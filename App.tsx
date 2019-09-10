import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabbar from './components/tabbar'
export default function App() {
  return (
    <View style={styles.container}>
      <Tabbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'flex-end',
  },
});
