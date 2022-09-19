import React, {useState} from 'react';
import Video from 'react-native-video';
import ProgressBar from './progressBar/ProgressBar';
import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const StoryContent = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPause, setPause] = useState(false);

  const _setCurrentIndex = param => {
    setCurrentIndex(param);
  };

  const _pauseCallBack = pause => {
    setPause(pause);
  };

  const changeStory = event => {
    if (event.locationX > width / 2) {
      newStory();
    } else {
      previousStory();
    }
  };

  const newStory = () => {
    currentAnim = 0;
    if (props.story.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const previousStory = () => {
    currentAnim = 0;
    if (currentIndex > 0 && props.story.length) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const pauseStory = value => {
    console.log(value);
    setPause(value);
  };

  return (
    <TouchableOpacity
      delayLongPress={500}
      onLongPress={() => pauseStory(true)}
      onPressOut={() => {
        setPause(false);
      }}
      onPress={event => changeStory(event.nativeEvent)}
      activeOpacity={1}
      style={styles.parentContainer}>
      <ProgressBar
        stories={props.story}
        isPause={isPause}
        setPause={_pauseCallBack}
        getAnimatedValue={anim => {
          if (!isPause) {
            currentAnim = anim;
          }
        }}
        currentAnim={currentAnim}
        currentIndex={currentIndex}
        setCurrentIndex={_setCurrentIndex}
      />
      {props?.story[currentIndex]?.type == 'video' ? (
        <Video
          source={{uri: props?.story[currentIndex].url}}
          resizeMode={'contain'}
          style={styles.videoStyle}
          paused={isPause}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={styles.imageDefaultStyle}
          source={{uri: props.story[currentIndex].url}}
        />
      )}
    </TouchableOpacity>
  );
};

export default StoryContent;

const styles = StyleSheet.create({
  parentContainer: {flex: 1},
  imageDefaultStyle: {height: '100%', width: '100%'},
  videoStyle: {
    height: '100%',
    width: '100%',
  },
});
