import React from 'react';
import StoryContent from './StoryContent';

const StoryView = ({storyData}) => {
  return <StoryContent story={storyData?.stories} />;
};

export default React.memo(StoryView);
