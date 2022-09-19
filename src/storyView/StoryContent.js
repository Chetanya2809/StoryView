import Colors from '../utils/Colors';
import React, {useState} from 'react';
import Video from 'react-native-video';
import ProgressBar from './progressBar/ProgressBar';
import {StyleSheet, Image, Dimensions, View} from 'react-native';

const height = Dimensions.get('window').width;

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
      {props?.story[currentIndex]?.type == 'video' ? (
        <Video
          source={{uri: props?.story[currentIndex].url}}
          resizeMode={'contain'}
          style={{
            height: '80%',
            width: height,
            backgroundColor: Colors.black,
            marginTop: '30%',
          }}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}
          source={{uri: props.story[currentIndex].url}}
        />
      )}
    </View>
  );
};

export default StoryContent;

const styles = StyleSheet.create({});
