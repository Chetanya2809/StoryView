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
      }, 10);
    };

    return (
      <>
        <TouchableOpacity
          style={styles.listContainerView}
          onPress={onPressCard}>
          <Image source={{uri: profile}} style={styles.profileImage} />
          <Text style={styles.userNameText}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.topSeperatorView} />
      </>
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
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.warmGrey,
  },
  listContainerView: {
    height: 100,
    padding: 10,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
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
