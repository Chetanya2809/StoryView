import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Colors from '../../utils/Colors';
import React, {useEffect, useRef, useState} from 'react';

const {height, width} = Dimensions.get('screen');

const ProgressBar = ({currentIndex, setCurrentIndex, stories}) => {
  const [data, setData] = useState(stories);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: stories[currentIndex].duration,
      useNativeDriver: false,
    }).start(({finished}) => {
      {
        currentIndex < data.length - 1
          ? finished
            ? setCurrentIndex(currentIndex + 1)
            : null
          : null;
      }
      {
        currentIndex < data.length - 1
          ? finished
            ? anim.setValue(0)
            : null
          : null;
      }
    });
  }, [currentIndex]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      {stories.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              {width: width / data.length - 3},
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
                      outputRange: [0, width / data.length - data.length],
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
    // position: 'absolute',
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
