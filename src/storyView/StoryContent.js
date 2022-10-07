import {Animated, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RenderStoryItem from '../components/renderItem/RenderStoryItem';
import Colors from '../utils/Colors';

const {height, width} = Dimensions.get('window');

const StoryContent = props => {
  const flatListref = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
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
  }, []);

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
          index={index}
          open={props?.open}
          profile={item?.profile}
          storyUrl={item?.stories}
          userName={item?.username}
          handleOpen={props?.handleOpen}
          headerLeftIcon={props.headerLeftIcon}
          progressViewColor={props.progressViewColor}
          progressViewCompleteColor={props.progressViewCompleteColor}
        />
      </Animated.View>
    );
  };

  return (
    <>
      <Animated.FlatList
        disableIntervalMomentum={true}
        contentContainerStyle={styles._contentContainerStyle}
        bounces={false}
        ref={flatListref}
        pagingEnabled={true}
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
  _contentContainerStyle: {
    backgroundColor: Colors.black,
  },
});

export default React.memo(StoryContent);
