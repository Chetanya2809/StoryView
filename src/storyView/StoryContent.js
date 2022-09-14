import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import ProgressBar from './progressBar/ProgressBar';

const height = Dimensions.get('window').width;
console.log('hereee', height);
const StoryContent = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const _setCurrentIndex = param => {
    setCurrentIndex(param);
  };
  return (
    <View style={{flex: 1}}>
      <ProgressBar
        stories={props.story}
        currentIndex={currentIndex}
        setCurrentIndex={_setCurrentIndex}
      />
      <Video
        source={{uri: props.story[0].url}}
        resizeMode={'contain'}
        repeat={true}
        style={{
          height: '100%',
          width: height ,
          // margin: 4,
          backgroundColor: 'black',
        }}
      />
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
