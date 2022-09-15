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
import React, {useState} from 'react';
import Strings from '../utils/Strings';
import vidArr from '../utils/Constansts';
import StoryContainer from './StoryContainer';

const StatusList = () => {
  const [open, setOpen] = useState({open: false});
  const handleOpen = param => {
    setOpen(param);
  };
  const onRender = ({item}) => {
    const {username, profile} = item;

    const onPressCard = () => {
      setTimeout(() => {
        setOpen({open: true, item});
      }, 100);
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
      <Text style={styles.headerText}>{Strings.status}</Text>
      <View style={styles.topSeperatorView} />
      <StoryContainer open={open} handleOpen={handleOpen} />
      <FlatList data={vidArr} renderItem={onRender} />
    </SafeAreaView>
  );
};

export default StatusList;

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
    flexDirection: 'row',
    height: 100,
    padding: 10,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  userNameText: {
    fontSize: 20,
    color: Colors.white,
    marginTop: 30,
    fontSize: 20,
    marginLeft: 20,
  },
});
