import React from 'react';
import StoryContent from './StoryContent';
import {StyleSheet, Modal, Dimensions} from 'react-native';

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
          <StoryContent
            data={data}
            open={open}
            handleOpen={handleOpen}
            story={open?.item?.stories}
            profile={open?.item?.profile}
            userName={open?.item?.username}
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
