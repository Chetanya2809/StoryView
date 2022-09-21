import Video from 'react-native-video';
import React, {useCallback, useState} from 'react';
import ProgressBar from './progressBar/ProgressBar';
import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const StoryContent = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPause, setPause] = useState(false);

  const _setCurrentIndex = useCallback(
    param => {
      setCurrentIndex(param);
    },
    [currentIndex],
  );

  const _pauseCallBack = useCallback(
    pause => {
      setPause(pause);
    },
    [isPause],
  );

  const changeStory = useCallback(
    event => {
      if (event.locationX > width / 2) {
        newStory();
      } else {
        previousStory();
      }
    },
    [currentIndex],
  );

  const newStory = useCallback(() => {
    currentAnim = 0;

    if (props.story.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const previousStory = useCallback(() => {
    currentAnim = 0;

    if (currentIndex > 0 && props.story.length) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const pauseStory = useCallback(
    value => {
      setPause(value);
    },
    [isPause],
  );

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

const styles = StyleSheet.create({
  parentContainer: {flex: 1},
  imageDefaultStyle: {height: '100%', width: '100%'},
  videoStyle: {
    height: '100%',
    width: '100%',
  },
});

export default React.memo(StoryContent);
