import React from 'react';
import StoryContent from './StoryContent';

const StoryView = ({storyData, index, handleOpen, open}) => {
  return (
    <StoryContent
      index={index}
      open={open}
      handleOpen={handleOpen}
      story={storyData?.stories}
      profile={storyData?.profile}
      userName={storyData?.username}
    />
  );
};

export default React.memo(StoryView);
