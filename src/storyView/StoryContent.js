import Video from 'react-native-video';

import React, {useCallback, useRef, useState} from 'react';
import ProgressBar from './progressBar/ProgressBar';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';

import React, {useCallback, useState} from 'react';
import ProgressBar from './progressBar/ProgressBar';
import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';


const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const StoryContent = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPause, setPause] = useState(false);
  const [loader, setLoader] = useState(true);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

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
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      delay: 200,
      useNativeDriver: true,
    }).start();
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
    setPause(true);
  }, []);

  const thumbnailLoader = () => {
    return (
      <Animated.Image
        resizeMode="contain"
        source={{uri: props?.story[currentIndex]?.thumbnailUrl}}
        style={[
          styles.imageDefaultStyle,
          {
            opacity: fadeAnimation,
          },
        ]}
        onLoadEnd={() => {
          setInterval(() => {
            setLoader(false);
            startAnim();
          }, 300);
        }}
      />
    );
  };

  const startAnimation = () => {
    setIsLoading(true);
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const contentLoaded = () => {
    return (
      <>
        {props.story[currentIndex]?.type === 'video' ? (
          <View>
            <AnimatedVideo
              onLoadStart={startAnimation}
              paused={isPause}
              resizeMode={'contain'}
              onLoad={() => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 300);
              }}
              style={[
                styles.videoStyle,
                {
                  opacity: opacityAnimation,
                },
              ]}
              source={{uri: props?.story[currentIndex].url}}
            />
            {isLoading ? (
              <ActivityIndicator
                color={'red'}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : null}
          </View>
        ) : (
          <Animated.Image
            onLoadStart={startAnimation}
            resizeMode="contain"
            source={{uri: props?.story[currentIndex]?.url}}
            style={[
              styles.imageDefaultStyle,
              {
                opacity: opacityAnimation,
              },
            ]}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: '100%',
  },
  parentContainer: {flex: 1},
  imageDefaultStyle: {height: '100%', width: '100%'},
});

export default React.memo(StoryContent);
