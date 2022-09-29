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
        setOpen({open: true, item, index});

        setOpen({open: true, item});
      }, 10);
    };

    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.listContainerView}
          onPress={onPressCard}>
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

      <StoryContainer data={vidArr} open={open} handleOpen={handleOpen} />
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
    alignSelf: 'center',
    color: Colors.white,
  },
  topSeperatorView: {
    height: 1,
    marginHorizontal: 5,
    backgroundColor: Colors.warmGrey,
  },
  listContainerView: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileView: {
    height: 75,
    width: 75,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 8,
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
