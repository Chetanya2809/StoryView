import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Colors from '../../utils/Colors';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';

const {height, width} = Dimensions.get('screen');
var anim = new Animated.Value(0);

const ProgressBar = (
  {
    currentIndex,
    setCurrentIndex,
    stories,
    isPause,
    currentAnim,
    getAnimatedValue,
  },
  ref,
) => {
  useEffect(() => {
    console.log('ispaused', isPause);
    if (isPause) {
      anim.stopAnimation();
    } else animationFunction(currentAnim);
  }, [isPause]);

  useEffect(() => {
    anim.setValue(0);
    animationFunction();
  }, [currentIndex]);

  useEffect(() => {
    anim.addListener(({value}) => getAnimatedValue(value));
  }, []);

  const animationFunction = (currentAnim = 0) => {
    anim.setValue(currentAnim);
    Animated.timing(anim, {
      toValue: 1,
      duration:
        stories[currentIndex].duration -
        stories[currentIndex].duration * currentAnim,
      useNativeDriver: false,
    }).start(({finished}) => {
      {
        currentIndex < stories.length - 1
          ? finished
            ? setCurrentIndex(currentIndex + 1)
            : null
          : null;
      }
      {
        currentIndex < stories.length - 1
          ? finished
            ? anim.setValue(0)
            : null
          : null;
      }
    });
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      {stories.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              {width: width / stories.length - 3},
              styles.fixedView,
              {
                backgroundColor:
                  index < currentIndex ? Colors.red : Colors.warmGrey,
              },
            ]}>
            {index === currentIndex ? (
              <Animated.View
                style={[
                  styles.progressView,
                  {
                    width: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, width / stories.length - stories.length],
                    }),
                  },
                ]}
              />
            ) : (
              <View style={styles.seenedView} />
            )}
          </View>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '10%',
    position: 'absolute',
  },
  progressView: {
    height: 7,
    borderRadius: 30,
    backgroundColor: Colors.red,
  },
  fixedView: {
    borderWidth: 0.3,
    borderRadius: 30,
    backgroundColor: Colors.warmGrey,
  },
  seenedView: {
    height: 5,
    borderRadius: 30,
  },
});

export default ProgressBar;
