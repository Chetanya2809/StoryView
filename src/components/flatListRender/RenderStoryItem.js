import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import Video from 'react-native-video';
import Colors from '../../utils/Colors';
import ProgressBar from '../../storyView/progressBar/ProgressBar';
import StoryHeader from '../header/StoryHeader';

const {height, width} = Dimensions.get('window');

const RenderStoryItem = props => {
  let currentAnim = 0;

  const [loader, setLoader] = useState(true);
  const [isPause, setPause] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const opacityAnimation = useRef(new Animated.Value(0.3)).current;

  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const AnimatedVideo = Animated.createAnimatedComponent(Video);

  const onSwipeDown = useCallback(() => {
    props?.handleOpen({...props.open, open: false});
  }, [props?.open]);

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

  const _onLoadEnd = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
      startAnim();
    }, 300);
  }, [loader]);

  const startAnim = useCallback(animationStart => {
    // setIsLoading(true);
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      delay: 200,
      useNativeDriver: true,
    }).start();

    if (animationStart) animationStart(0);
  }, []);

  const pauseStory = useCallback(() => {
    setPause(true);
  }, [isPause]);

  const _setCurrentIndex = param => {
    setCurrentIndex(param);
  };

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

  const contentLoaded = () => {
    return (
      <>
        {/* {console.log(
          '345678iop;lkjhgfdsaqw5678',
          currentIndex,
          props.storyUrl[currentIndex]?.url,
        )} */}
        {props.storyUrl[currentIndex]?.type === 'video' ? (
          <AnimatedVideo
            // playInBackground={false}
            // onLoad={_onLoad}
            // onLoadStart={startAnimation}
            // paused={isPause}
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
            // onLoadStart={startAnimation}
            // onLoad={_onLoad}
            resizeMode="contain"
            source={{uri: props.storyUrl[currentIndex]?.url}}
            style={[
              styles.imageDefaultStyle,
              // {
              //   opacity: opacityAnimation,
              // },
            ]}
          />
        )}
      </>
    );
  };

  return (
    <GestureRecognizer
      style={{
        backgroundColor: 'transparent',
        height: height,
        width: width,
      }}
      onSwipeDown={onSwipeDown}>
      <TouchableOpacity
        delayLongPress={500}
        onLongPress={pauseStory}
        onPressOut={() => {
          setPause(false);
        }}
        onPress={event => {
          changeStory(event?.nativeEvent);
        }}
        activeOpacity={1}
        style={styles.parentContainer}>
        {loader ? thumbnailLoader() : contentLoaded()}
      </TouchableOpacity>

      <ProgressBar
        startAnim={startAnim}
        loader={loader}
        open={props?.open}
        handleOpen={props?.handleOpen}
        stories={props.storyUrl}
        index={props.index}
        profile={props.profile}
        userName={props.userName}
        isPause={isPause}
        // setPause={_pauseCallBack}
        // getAnimatedValue={getAnimatedValue}
        currentAnim={currentAnim}
        currentIndex={currentIndex}
        honewalaIndex={props?.fin?.next}
        setCurrentIndex={_setCurrentIndex}
      />
      {/* <StoryHeader
        open={props?.open}
        profile={props?.profile}
        userName={props?.userName}
        handleOpen={props?.handleOpen}
        createdAt={props?.storyUrl[currentIndex]?.created}
      /> */}
    </GestureRecognizer>
  );
};

export default React.memo(RenderStoryItem);

const styles = StyleSheet.create({
  parentContainer: {
    height: height,
    width: width,
  },
  imageDefaultStyle: {height: '100%', width: '100%'},
  videoStyle: {height: '100%', width: '100%'},
  indicatorStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});
