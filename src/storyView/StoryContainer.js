import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import StoryView from './StoryView';

const {height, width} = Dimensions.get('screen');
const StoryContainer = ({open, handleOpen}) => {
  return (
    <Modal
      isVisible={open.open}
      coverScreen={true}
      style={{
        backgroundColor: 'black',
        margin: 0,

        // height: height,
        // width: width,
      }}>
      {/* <ProgressBar /> */}
      <StoryView storyData={open.item} />
    </Modal>
  );
};

export default StoryContainer;

const styles = StyleSheet.create({});
