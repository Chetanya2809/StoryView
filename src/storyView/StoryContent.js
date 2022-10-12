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

const {height, width} = Dimensions.get('window');
let currentAnim = 0;

const StoryContent = props => {
  const flatListref = useRef();

  const [index, setIndex] = useState(0);
  const [fin, setFIN] = useState({previous: 0, next: 0});

  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0.3)).current;
  const animateRound = useRef(new Animated.Value(0)).current;

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
    // fadeAnimation.removeListener();}
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

  const startAnimation = () => {
    setIsLoading(true);
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const getAnimatedValue = anim => {
    currentAnim = anim;
  };

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
      <Animated.View style={[{transform: [{rotate}, {translateX: rightGap}]}]}>
        <RenderStoryItem
          viewbleIndex={fin}
          open={props?.open}
          handleOpen={props?.handleOpen}
          storyUrl={item?.stories}
          fin={fin}
          profile={item?.profile}
          userName={item?.username}
        />
      </Animated.View>
    );
  };

  let count = 0;
  const onViewableItemsChanged = ({changed, viewableItems}) => {
    if (changed[0].isViewable) {
      setFIN({next: changed[0].index});
    }
  };
  const viewabilityConfig = {
    waitForInteraction: true,
    minimumViewTime: 600,
    itemVisiblePercentThreshold: 85,
  };

  const onViewableItemsChangedpairs = React.useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  return (
    <Animated.FlatList
      disableIntervalMomentum={true}
      contentContainerStyle={{backgroundColor: 'black'}}
      bounces={false}
      ref={flatListref}
      pagingEnabled={true}
      horizontal={true}
      viewabilityConfigCallbackPairs={onViewableItemsChangedpairs.current}
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
      // keyExtractor={item => item.stories[currentIndex]?.url}
    />
  );
};

const styles = StyleSheet.create({});

export default React.memo(StoryContent);
