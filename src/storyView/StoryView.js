import React from 'react';
import StoryContent from './StoryContent';

const StoryView = ({storyData, handleOpen, open, data}) => {
  return (
    <StoryContent
      data={data}
      open={open}
      handleOpen={handleOpen}
      story={storyData?.stories}
      profile={storyData.profile}
      userName={storyData.username}
    />
  );
};

export default React.memo(StoryView);
