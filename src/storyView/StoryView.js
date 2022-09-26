import React from 'react';
import StoryContent from './StoryContent';

const StoryView = ({storyData}) => {
  return (
    <StoryContent
      story={storyData?.stories}
      profile={storyData.profile}
      userName={storyData.username}
    />
  );
};

export default React.memo(StoryView);
