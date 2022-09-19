import React from 'react';
import {StyleSheet} from 'react-native';
import StoryContent from './StoryContent';

const StoryView = ({storyData}) => {
  console.log('storyData', storyData);
  return <StoryContent story={storyData?.stories} />;
};

export default StoryView;

const styles = StyleSheet.create({});
