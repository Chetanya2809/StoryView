import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Colors from '../../utils/Colors';
import StoryHeader from '../header/StoryHeader';
import React, {useCallback, useRef, useState} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import ProgressBar from '../../storyView/progressBar/ProgressBar';

const {height, width} = Dimensions.get('window');

const RenderStoryItem = props => {
  let currentAnim = 0;
  const [loader, setLoader] = useState(true);
  const [isPause, setPause] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const AnimatedVideo = Animated.createAnimatedComponent(Video);
  const opacityAnimation = useRef(new Animated.Value(0.3)).current;

  const onSwipeDown = useCallback(() => {
    props?.handleOpen({...props.open, open: false});
  }, [props?.open]);

  const startAnimation = useCallback(() => {
    setIsLoading(true);
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  const startAnim = useCallback(
    animationStart => {
      setIsLoading(true);
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }).start();

      if (animationStart) animationStart(0);
    },
    [isLoading],
  );

  const _onLoad = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, [isLoading]);

  const _onLoadEnd = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
      startAnim();
    }, 300);
  }, [loader]);

  const getAnimatedValue = useCallback(
    anim => {
      if (!isPause) {
        currentAnim = anim;
      }
    },
    [isPause],
  );

  const _pauseCallBack = useCallback(
    pause => {
      setPause(pause);
    },
    [isPause],
  );

  const _setCurrentIndex = useCallback(
    param => {
      setCurrentIndex(param);
    },
    [currentIndex],
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
    if (props?.storyUrl.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const previousStory = useCallback(() => {
    if (currentIndex > 0 && props.storyUrl.length) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const pauseStory = useCallback(() => {
    setPause(true);
  }, [isPause]);

  const thumbnailLoader = useCallback(() => {
    return (
      <Animated.Image
        resizeMode="contain"
        source={{uri: props?.storyUrl[currentIndex]?.thumbnailUrl}}
        style={[
          styles.imageDefaultStyle,
          {
            opacity: fadeAnimation,
          },
        ]}
        onLoadEnd={_onLoadEnd}
      />
    );
  }, [currentIndex]);

  const _onPressOut = useCallback(() => {
    setPause(false);
  }, [isPause]);

  const contentLoaded = useCallback(() => {
    return (
      <>
        {props.storyUrl[currentIndex]?.type === 'video' ? (
          <AnimatedVideo
            onLoad={_onLoad}
            onLoadStart={startAnimation}
            paused={isPause}
            resizeMode={'contain'}
            style={[
              styles.videoStyle,
              {
                opacity: opacityAnimation,
              },
            ]}
            source={{uri: props.storyUrl[currentIndex]?.url}}
          />
        ) : (
          <Animated.Image
            onLoadStart={startAnimation}
            onLoad={_onLoad}
            resizeMode="contain"
            source={{uri: props.storyUrl[currentIndex]?.url}}
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
  }, [currentIndex, isPause]);

  return (
    <GestureRecognizer style={styles.gestureStyle} onSwipeDown={onSwipeDown}>
      <TouchableOpacity
        delayLongPress={500}
        onLongPress={pauseStory}
        onPressOut={_onPressOut}
        onPress={event => {
          changeStory(event?.nativeEvent);
        }}
        activeOpacity={1}
        style={styles.parentContainer}>
        {loader ? thumbnailLoader() : contentLoaded()}
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator color={Colors.red} style={styles.indicatorStyle} />
      ) : null}
      <ProgressBar
        loader={loader}
        isPause={isPause}
        open={props?.open}
        index={props.index}
        startAnim={startAnim}
        stories={props.storyUrl}
        profile={props.profile}
        userName={props.userName}
        setPause={_pauseCallBack}
        currentAnim={currentAnim}
        currentIndex={currentIndex}
        handleOpen={props?.handleOpen}
        setCurrentIndex={_setCurrentIndex}
        getAnimatedValue={getAnimatedValue}
      />
      <StoryHeader
        open={props?.open}
        profile={props?.profile}
        leftIcon={require('../../assets/images/arrow.png')}
        userName={props?.userName}
        handleOpen={props?.handleOpen}
        createdAt={props?.storyUrl[currentIndex]?.created}
      />
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    height: height,
    width: width,
  },
  gestureStyle: {
    backgroundColor: Colors.black,
    height: height,
    width: width,
  },
  indicatorStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  videoStyle: {height: '100%', width: '100%'},
  imageDefaultStyle: {height: '100%', width: '100%'},
});

export default React.memo(RenderStoryItem);
