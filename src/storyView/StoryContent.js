import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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
    <TouchableOpacity style={{flex: 1}}>
      <ProgressBar
        stories={props.story}
        currentIndex={currentIndex}
        setCurrentIndex={_setCurrentIndex}
      />
      {props.story[currentIndex].type == 'video' ? (
        <Video
          source={{uri: props.story[currentIndex].url}}
          resizeMode={'contain'}
          // repeat={true}
          style={{
            height: '100%',
            width: height,
            backgroundColor: 'black',
          }}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}
          source={{uri: props.story[currentIndex].url}}
        />
      )}
    </TouchableOpacity>
  );
};

export default StoryContent;

const styles = StyleSheet.create({});
