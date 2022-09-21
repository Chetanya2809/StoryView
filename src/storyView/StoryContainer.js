import React from 'react';
import StoryView from './StoryView';
import Colors from '../utils/Colors';
import Modal from 'react-native-modal';

const StoryContainer = ({open, handleOpen}) => {
  const onCompleteSwipe = () => {
    handleOpen({...open, open: false});
  };
  
  console.time('StoryContainer')
  return (
    <Modal
      isVisible={open.open}
      coverScreen={true}
      swipeDirection='down'
      onSwipeComplete={onCompleteSwipe}
      style={{
        backgroundColor: Colors.black,
        margin: 0,
      }}
      >
      <StoryView storyData={open.item} />
    </Modal>
  );
};

export default React.memo(StoryContainer);
