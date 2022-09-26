import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../../utils/Colors';

const {height, width} = Dimensions.get('screen');
var anim = new Animated.Value(0);

const ProgressBar = ({
  currentIndex,
  setCurrentIndex,
  stories,
  loader,
  startAnim,
  isPause,
  currentAnim,
  getAnimatedValue,
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
      console.log('myvalues', value);
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
    </SafeAreaView>
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
    backgroundColor: Colors.red,
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
