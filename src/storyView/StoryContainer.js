import React from 'react';
import StoryContent from './StoryContent';
import {StyleSheet, Modal, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const StoryContainer = ({
  open,
  data,
  header,
  handleOpen,
  animationType,
  headerLeftIcon,
  progressViewColor,
  headerLeftIconStyle,
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
            header={header}
            handleOpen={handleOpen}
            headerLeftIcon={headerLeftIcon}
            progressViewColor={progressViewColor}
            headerLeftIconStyle={headerLeftIconStyle}
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
