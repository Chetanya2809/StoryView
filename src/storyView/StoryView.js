import React, {useState} from 'react';
import Video from 'react-native-video';
import {FlatList, Image, StyleSheet, Dimensions} from 'react-native';
import vidArr from '../utils/Constansts';
import StoryContent from './StoryContent';

const {height, width} = Dimensions.get('screen');
const StoryView = ({storyData}) => {
  const [data, setData] = useState(vidArr);
  console.log('datata', data);

  const _onRender = ({item, index}) => {
    console.log('itema', item);
    return <StoryContent story={item.stories} />;
  };

  const _keyExtractor = item => {
    return item.username;
  };

  return (
    <StoryContent story={storyData.stories} />
    // <FlatList
    //   data={data}
    //   renderItem={_onRender}
    //   horizontal
    //   pagingEnabled={true}
    //   keyExtractor={_keyExtractor}
    // />
  );
};

export default StoryView;

const styles = StyleSheet.create({});
