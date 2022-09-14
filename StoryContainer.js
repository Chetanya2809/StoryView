import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import Video from 'react-native-video';

const StoryContainer = () => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{overflow: 'hidden'}}>
      <Animated.View
        style={{
          height: 30,
          width: 390,
          borderWidth: 1,
          marginTop: 100,
          backgroundColor: 'red',
          transform: [
            {
              translateX: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-390, 0],
              }),
            },
          ],
        }}
      />
      <Video
        source={require('./src/assets/videos/loo.mov')}
        resizeMode={'contain'}
        allowsExternalPlayback={true}
        style={{height: '100%', width: '100%', borderWidth: 1}}
      />
    </View>
  );
};

export default StoryContainer;
