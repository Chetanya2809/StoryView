import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import vidArr from '../utils/Constansts';
import Svg, {Circle} from 'react-native-svg';
import StoryContainer from './StoryContainer';
import React, {useCallback, useState} from 'react';

const StatusList = () => {
  const [open, setOpen] = useState({open: false, index: 0, item: {}});

  const handleOpen = useCallback(
    param => {
      setOpen(param);
    },
    [open],
  );

  const onRender = ({item, index}) => {
    const {username, profile} = item;
    const onPressCard = () => {
      setTimeout(() => {
        setOpen({open: true, item: vidArr[index], index});
      }, 10);
    };

    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.listContainerView}
          onPress={onPressCard}>
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="green"
              strokeWidth={4}
              strokeDasharray="100 2"
              strokeDashoffset={-2}
            />

            <Image source={{uri: profile}} style={styles.profileImage} />
          </Svg>

          <Text style={styles.userNameText}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.topSeperatorView} />
      </React.Fragment>
    );
  };
  return (
    <SafeAreaView style={styles.parentContainer}>
      <Text style={styles.headerText}>{'Users Status'}</Text>
      <View style={styles.topSeperatorView} />
      <StoryContainer data={open.item} open={open} handleOpen={handleOpen} />
      <FlatList data={vidArr} renderItem={onRender} bounces={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerText: {
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
    color: Colors.white,
  },
  topSeperatorView: {
    height: 1,
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.warmGrey,
  },
  listContainerView: {
    height: 100,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 10,
  },
  userNameText: {
    fontSize: 20,
    fontSize: 20,
    marginTop: 30,
    marginLeft: 20,
    color: Colors.white,
  },
});

export default React.memo(StatusList);
