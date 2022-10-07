import React from 'react';
import StoryContent from './StoryContent';
import {StyleSheet, Modal, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const StoryContainer = ({
  open,
  data,
  handleOpen,
  animationType,
  headerLeftIcon,
  progressViewColor,
  progressViewCompleteColor,
}) => {
  return (
    <>
      {open && (
        <Modal
          visible={open.open}
          transparent={false}
          animationType={animationType}
          style={styles.modalStyle}>
          <StoryContent
            data={data}
            open={open}
            handleOpen={handleOpen}
            story={open?.item?.stories}
            profile={open?.item?.profile}
            headerLeftIcon={headerLeftIcon}
            userName={open?.item?.username}
            progressViewColor={progressViewColor}
            progressViewCompleteColor={progressViewCompleteColor}
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
