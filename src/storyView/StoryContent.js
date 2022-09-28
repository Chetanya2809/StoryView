import Video from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ProgressBar from './progressBar/ProgressBar';
import {
  Image,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Colors from '../utils/Colors';
import RenderStoryItem from '../components/flatListRender/RenderStoryItem';
// import RenderStoryItem from '../components/flatListRender/RenderStoryItem';

const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const StoryContent = props => {
  const flatListref = useRef();

  const [isPause, setPause] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0.3)).current;
  const animateRound = useRef(new Animated.Value(0)).current;

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
    (event, item, i) => {
      if (i === props.open.index) {
        if (event.locationX > width / 2) {
          newStory(item);
        } else {
          previousStory(item);
        }
      }
    },
    [currentIndex],
  );
  const scrolltoPage = () => {
    flatListref.current.scrollToOffset({
      animated: false,
      offset: width * props?.open?.index,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrolltoPage();
    }, 200);
    // return () => {
    //   fadeAnimation.stopAnimation();
    //   fadeAnimation.removeListener();
    // };
  }, []);

  const startAnim = animationStart => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      delay: 200,
      useNativeDriver: true,
    }).start();

    if (animationStart) animationStart(0);
  };

  const newStory = useCallback(
    item => {
      currentAnim = 0;

      if (item.stories.length - 1 > currentIndex) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    },
    [currentIndex],
  );

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

  // const thumbnailLoader = item => {
  //   return (
  //     <Animated.Image
  //       resizeMode="contain"
  //       source={{uri: item.stories[currentIndex]?.thumbnailUrl}}
  //       style={[
  //         styles.imageDefaultStyle,
  //         {
  //           opacity: fadeAnimation,
  //         },
  //       ]}
  //       onLoadEnd={() => {
  //         setTimeout(() => {
  //           setLoader(false);
  //           startAnim();
  //         }, 300);
  //       }}
  //     />
  //   );
  // };

  // const startAnimation = () => {
  //   setIsLoading(true);

  //   Animated.timing(opacityAnimation, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const getAnimatedValue = useCallback(
    anim => {
      if (!isPause) {
        currentAnim = anim;
      }
    },
    [isPause],
  );

  // const contentLoaded = (item, index) => {

  //   return (
  //     <>
  //       {item.stories[currentIndex]?.type === 'video' ? (
  //         <View>

  //           <AnimatedVideo
  //             onLoadStart={startAnimation}
  //             paused={isPause}
  //             // resizeMode={'contain'}
  //             onLoad={() => {
  //               setTimeout(() => {
  //                 setIsLoading(false);
  //               }, 300);
  //             }}
  //             style={[
  //               styles.videoStyle,
  //               {
  //                 opacity: opacityAnimation,
  //               },
  //             ]}
  //             source={{uri: item.stories[currentIndex]?.url}}
  //           />
  //           {isLoading ? (
  //             <ActivityIndicator
  //               color={Colors.red}
  //               style={styles.indicatorStyle}
  //             />
  //           ) : null}
  //         </View>
  //       ) : (
  //         // <Animated.Image
  //         //   onLoadStart={startAnimation}
  //         //   resizeMode="contain"
  //         //   source={{uri: props?.story[currentIndex]?.url}}
  //         //   style={[
  //         //     styles.imageDefaultStyle,
  //         //     {
  //         //       opacity: opacityAnimation,
  //         //     },
  //         //   ]}
  //         // />
  //         <View>

  //           <Animated.Image
  //             onLoadStart={startAnimation}
  //             resizeMode="contain"
  //             source={{uri: item.stories[currentIndex]?.url}}
  //             style={[
  //               styles.imageDefaultStyle,
  //               {
  //                 opacity: opacityAnimation,
  //               },
  //             ]}
  //           />
  //         </View>
  //       )}
  //     </>
  //   );
  // };

  const _onRender = ({item, index}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const rotate = animateRound.interpolate({
      inputRange,
      outputRange: ['30 deg', '0 deg', '-30 deg'],
    });
    const rightGap = animateRound.interpolate({
      inputRange,
      outputRange: [200, 0, -200],
    });
    return (
      // <RenderStoryItem
      //   item={item.stories}
      //   loader={loader}
      //   contentLoaded={contentLoaded}
      //   getAnimatedValue={getAnimatedValue}
      //   thumbnailLoader={thumbnailLoader}
      //   onSwipeDown={onSwipeDown}
      // />
      // <GestureRecognizer
      //   style={styles.parentContainer}
      //   onSwipeDown={onSwipeDown}>
      //   <TouchableOpacity
      //     delayLongPress={500}
      //     onLongPress={pauseStory}
      //     onPressOut={() => {
      //       setPause(false);
      //     }}
      //     onPress={event => changeStory(event.nativeEvent)}
      //     activeOpacity={1}
      //     style={styles.parentContainer}>
      //     <ProgressBar
      //       startAnim={startAnim}
      //       loader={loader}
      //       open={props?.open}
      //       handleOpen={props?.handleOpen}
      //       stories={props.story}
      //       profile={props.profile}
      //       userName={props.userName}
      //       isPause={isPause}
      //       setPause={_pauseCallBack}
      //       getAnimatedValue={getAnimatedValue}
      //       currentAnim={currentAnim}
      //       currentIndex={currentIndex}
      //       setCurrentIndex={_setCurrentIndex}
      //     />
      //     {loader ? thumbnailLoader() : contentLoaded()}
      //   </TouchableOpacity>
      // </GestureRecognizer>
      <Animated.View style={[{transform: [{rotate}, {translateX: rightGap}]}]}>
        <RenderStoryItem
          open={props?.open}
          handleOpen={props?.handleOpen}
          storyUrl={item.stories}
        />
      </Animated.View>
    );
  };

  return (
    // <GestureRecognizer style={styles.parentContainer} onSwipeDown={onSwipeDown}>
    //   <TouchableOpacity
    //     delayLongPress={500}
    //     onLongPress={pauseStory}
    //     onPressOut={() => {
    //       setPause(false);
    //     }}
    //     onPress={event => changeStory(event.nativeEvent)}
    //     activeOpacity={1}
    //     style={styles.parentContainer}>
    //     <ProgressBar
    //       startAnim={startAnim}
    //       loader={loader}
    //       open={props?.open}
    //       handleOpen={props?.handleOpen}
    //       stories={props.story}
    //       profile={props.profile}
    //       userName={props.userName}
    //       isPause={isPause}
    //       setPause={_pauseCallBack}
    //       getAnimatedValue={getAnimatedValue}
    //       currentAnim={currentAnim}
    //       currentIndex={currentIndex}
    //       setCurrentIndex={_setCurrentIndex}
    //     />
    //     {loader ? thumbnailLoader() : contentLoaded()}
    //   </TouchableOpacity>
    // </GestureRecognizer>
    <>
      <Animated.FlatList
        contentContainerStyle={{backgroundColor: 'black'}}
        bounces={false}
        ref={flatListref}
        // pagingEnabled={true}
        horizontal={true}
        data={props?.data}
        decelerationRate={0}
        renderItem={_onRender}
        snapToInterval={width}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: animateRound}}}],
          {
            useNativeDriver: true,
          },
        )}
        keyExtractor={item => item.stories[currentIndex]?.url}
      />
    </>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: '100%',
  },
  parentContainer: {height: height, width: width, backgroundColor: 'black'},
  // indicatorStyle: {
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   alignItems: 'center',
  //   position: 'absolute',
  //   justifyContent: 'center',
  // },
  imageDefaultStyle: {height: '100%', width: '100%'},
});

export default React.memo(StoryContent);
