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
  const [open, setOpen] = useState({open: false});

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
        setOpen({open: true, index});
      }, 10);
    };

    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.listContainerView}
          onPress={onPressCard}>
          <Svg width="70" height="70" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={Colors.lightGrey}
              strokeWidth={4}
              strokeDasharray={
                item.stories.length > 1
                  ? `${(48 * 2 * Math.PI) / item.stories.length - 4} 4`
                  : null
              }
            />
            <View style={styles.profileView}>
              <Image source={{uri: profile}} style={styles.profileImage} />
            </View>
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
      <StoryContainer
        open={open}
        header={true}
        data={vidArr}
        animationType="slide"
        headerLeftIcon={true}
        handleOpen={handleOpen}
        progressViewColor={Colors.red}
        progressViewCompleteColor={Colors.red}
        headerLeftIconStyle={styles.headerLeftIconStyle}
      />
      <FlatList data={vidArr} renderItem={onRender} />
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
    marginBottom: 20,
    alignSelf: 'center',
    color: Colors.white,
  },
  topSeperatorView: {
    height: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.warmGrey,
  },
  listContainerView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileView: {
    width: 55,
    height: 55,
    marginVertical: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userNameText: {
    fontSize: 20,
    marginLeft: 20,
    color: Colors.white,
  },
});

export default React.memo(StatusList);
