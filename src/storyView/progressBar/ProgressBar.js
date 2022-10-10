import React, {useEffect} from 'react';
import Colors from '../../utils/Colors';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');
var anim = new Animated.Value(0);

const ProgressBar = ({
  loader,
  stories,
  isPause,
  startAnim,
  currentAnim,
  currentIndex,
  setCurrentIndex,
  getAnimatedValue,
  progressViewColor,
  progressViewCompleteColor,
}) => {
  useEffect(() => {
    if (isPause) {
      anim.stopAnimation();
    } else animationFunction(currentAnim);
  }, [isPause]);

  useEffect(() => {
    anim.setValue(0);
    !loader && startAnim(animationFunction);
  }, [currentIndex, loader]);

  useEffect(() => {
    anim.addListener(({value}) => {
      if (value != 1) getAnimatedValue(value);
    });

    return () => {
      anim.stopAnimation();
      anim.removeListener();
    };
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
    <>
      <View style={styles.parentContainer}>
        {stories.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                {width: width / stories.length - 3},
                styles.fixedView,
                {
                  backgroundColor:
                    index < currentIndex
                      ? progressViewCompleteColor
                      : Colors.warmGrey,
                },
              ]}>
              {index === currentIndex ? (
                <Animated.View
                  style={[
                    styles.progressView,
                    {backgroundColor: progressViewColor},
                    {
                      width: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          0,
                          width / stories.length - stories.length + 1,
                        ],
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    zIndex: 5,
    elevation: 5,
    width: width,
    marginTop: '10%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  progressView: {
    height: 3,
    borderRadius: 2,
  },
  fixedView: {
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.warmGrey,
  },
  seenedView: {
    height: 3,
    borderRadius: 2,
  },
});

export default React.memo(ProgressBar);
