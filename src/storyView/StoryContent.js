import Video from 'react-native-video';
import React, {useCallback, useEffect, useState} from 'react';
import ProgressBar from './progressBar/ProgressBar';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const StoryContent = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPause, setPause] = useState(false);
  const [loader, setLoader] = useState(true);

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

  const startAnim = param => {
    if (param) param();
  };

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

  const pauseStory = useCallback(() => {
    console.log('pauseStory');
    setPause(true);
  }, []);

  const thumbnailLoader = () => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: props?.story[currentIndex]?.thumbnailUrl}}
        style={styles.imageDefaultStyle}
        onLoadEnd={() => {
          setInterval(() => {
            setLoader(false);
            startAnim();
          }, 500);
        }}
      />
    );
  };

  const contentLoaded = () => {
    return (
      <>
        {props.story[currentIndex]?.type === 'video' ? (
          <Video
            paused={isPause}
            resizeMode={'contain'}
            style={styles.videoStyle}
            source={{uri: props?.story[currentIndex].url}}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={{uri: props?.story[currentIndex]?.url}}
            style={styles.imageDefaultStyle}
          />
        )}
      </>
    );
  };

  const getAnimatedValue = useCallback(
    anim => {
      if (!isPause) {
        currentAnim = anim;
      }
    },
    [isPause],
  );

  return (
    <TouchableOpacity
      delayLongPress={500}
      onLongPress={pauseStory}
      onPressOut={() => {
        setPause(false);
      }}
      onPress={event => changeStory(event.nativeEvent)}
      activeOpacity={1}
      style={styles.parentContainer}>
      <ProgressBar
        startAnim={startAnim}
        stories={props.story}
        isPause={isPause}
        setPause={_pauseCallBack}
        getAnimatedValue={getAnimatedValue}
        currentAnim={currentAnim}
        currentIndex={currentIndex}
        setCurrentIndex={_setCurrentIndex}
      />

      {loader ? thumbnailLoader() : contentLoaded()}
      {/* {loader && contentLoaded()} */}
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
