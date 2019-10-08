import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';

export default props => (
  <SafeAreaView {...props} style={[styles.AndroidSafeArea, props.style]} >
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});