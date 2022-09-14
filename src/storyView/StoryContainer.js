import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import StoryView from './StoryView';

const {height, width} = Dimensions.get('screen');
const StoryContainer = () => {
  return (
    <Modal
      isVisible={true}
      coverScreen={true}
      style={{
        backgroundColor: 'black',
        margin: 0,

        // height: height,
        // width: width,
      }}>
      <StoryView />
    </Modal>
  );
};

export default StoryContainer;

const styles = StyleSheet.create({});
