import React from 'react';
import StoryView from './StoryView';
import Colors from '../utils/Colors';
// import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import {StyleSheet, Modal, View, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const StoryContainer = ({open, handleOpen, data}) => {
  return (

    <>
      {open && (
        <Modal
          visible={open.open}
          transparent={false}
          animationType="slide"
          style={styles.modalStyle}>
          <StoryView
            data={data}
            storyData={open.item}
            open={open}
            handleOpen={handleOpen}
          />
        </Modal>
      )}
    </>

    // <Modal
    //   isVisible={open.open}
    //   coverScreen={true}
    //   swipeDirection="down"
    //   onSwipeComplete={onCompleteSwipe}
    //   style={styles.modalStyle}>
    // </Modal>

    <Modal
      isVisible={open.open}
      coverScreen={true}
      swipeDirection="down"
      onSwipeComplete={onCompleteSwipe}
      style={styles.modalStyle}>
      <StoryView
        open={open}
        handleOpen={handleOpen}
        storyData={open.item}
        index={open.index}
      />
    </Modal>

  );
};

const styles = StyleSheet.create({
  modalStyle: {
    // margin: 0,
    height: height,
    width: width,
  },
});

export default React.memo(StoryContainer);
