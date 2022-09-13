import React from 'react';
import Video from 'react-native-video';
import {StyleSheet, Text, View} from 'react-native';

const App = () => {
  return <Video source={require("./src/assets/videos/loo.mov")} resizeMode={'contain'} style={{height: "100%",width: "100%",borderWidth: 1}} />;
};

export default App;

const styles = StyleSheet.create({});
