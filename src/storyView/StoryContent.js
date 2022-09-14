import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const height = Dimensions.get('window').width;
console.log('hereee', height);
const StoryContent = props => {
  console.log('my PRops', props.story);
  return (
    <View style={{flex: 1}}>
      {/* {props.story.map(item => {
        return ( */}
      <Video
        source={{uri: props.story[0].url}}
        resizeMode={'contain'}
        repeat={true}
        style={{
          height: '100%',
          width: height - 10,
          margin: 4,
          backgroundColor: 'red',
        }}
      />
      {/* );
      })} */}
    </View>
    // <Image
    //     resizeMode="contain"
    //     style={{height: '100%', width: '100%'}}
    //     source={require('../assets/images/michael-dam-mEZ3PoFGs_k-unsplash.jpg')}
    //   />
  );
};

export default StoryContent;

const styles = StyleSheet.create({});
