import React from 'react';
import StoryView from './StoryView';
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
            open={open}
            storyData={open.item}
            handleOpen={handleOpen}
          />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    height: height,
    width: width,
  },
});

export default React.memo(StoryContainer);
