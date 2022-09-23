import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StoryHeader = () => {
  return (
    <View style={styles.parentView}>
      <Text>StoryHeader</Text>
    </View>
  );
};

export default StoryHeader;

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'red',
    height: 50,
  },
});
