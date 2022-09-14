import React, {useState} from 'react';
import Video from 'react-native-video';
import {FlatList, Image, StyleSheet, Dimensions} from 'react-native';
import vidArr from '../utils/Constansts';
import StoryContent from './StoryContent';

const {height, width} = Dimensions.get('screen');
const StoryView = () => {
  const [data, setData] = useState(vidArr);
  console.log('datata', data);

  const _onRender = ({item, index}) => {
    console.log('itema', item);
    return <StoryContent story={item.stories} />;
  };

  return (
    <FlatList
      // contentContainerStyle={styles.flatListContainer}
      data={data}
      renderItem={_onRender}
      horizontal
      pagingEnabled={true}
    />
  );
};

export default StoryView;

const styles = StyleSheet.create({
  flatListContainer: {
    // height: height,
    // width: width,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
});
