import React from 'react';
import StoryView from './StoryView';
import Colors from '../utils/Colors';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';

const StoryContainer = ({open, handleOpen}) => {
  const onCompleteSwipe = () => {
    handleOpen({...open, open: false});
  };

  return (
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
    margin: 0,
    backgroundColor: Colors.black,
  },
});

export default React.memo(StoryContainer);
