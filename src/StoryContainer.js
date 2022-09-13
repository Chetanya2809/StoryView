import React from 'react';
import Video from 'react-native-video';

const StoryContainer = () => {
  return (
    <Video
      source={require('./assets/videos/loo.mov')}
      resizeMode={'contain'}
      allowsExternalPlayback={true}
      style={{height: '100%', width: '100%', borderWidth: 1}}
    />
  );
};

export default StoryContainer;
