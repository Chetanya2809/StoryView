import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../utils/Colors';

const {height, width} = Dimensions.get('window');

const StoryHeader = ({profile, userName, createdAt, open, handleOpen}) => {
  const convertDate = date => {
    let startDate = new Date(date);
    let endDate = new Date();
    let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let current;
    if (days >= 1) {
      current = days == 1 ? 'day' : 'yesterday';
      return current;
    } else if (hours > 1) {
      current = days == 1 ? 'hour' : 'hours';
      return Math.trunc(hours) + ' ' + current + ' ' + 'ago';
    } else {
      current = minutes == 1 ? 'minute' : 'minutes';
      return Math.trunc(minutes) + ' ' + current + ' ' + 'ago';
    }
  };

  const handleBackPress = () => {
    handleOpen({...open, open: false});
  };

  return (
    <View style={styles.parentView}>
      <TouchableOpacity
        style={styles.leftIconView}
        activeOpacity={0.8}
        onPress={handleBackPress}>
        <Image
          source={require('../../assets/images/arrow.png')}
          style={styles.leftIcon}
        />
      </TouchableOpacity>
      <View style={styles.profileView}>
        <Image source={{uri: profile}} style={styles.profileStyle} />
      </View>
      <View style={styles.userDetailsView}>
        <Text style={styles.usernameStyle}>{userName}</Text>
        <Text style={styles.storyTimeStyle}>
          {createdAt && convertDate(createdAt)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  parentView: {
    zIndex: 1,
    height: 50,
    padding: 5,
    elevation: 1,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{translateY: 50}],
  },
  leftIconView: {height: height / 45, width: width / 16},
  leftIcon: {height: '100%', width: '100%', marginLeft: 5},
  profileView: {
    marginLeft: 20,
    borderRadius: 50,
    width: width / 10,
    overflow: 'hidden',
    height: height / 22,
    backgroundColor: Colors.darkWhite,
  },
  profileStyle: {height: '100%', width: '100%'},
  usernameStyle: {color: Colors.white, fontSize: 17, fontWeight: 'bold'},
  storyTimeStyle: {fontSize: 10, color: Colors.white, marginTop: 3},
  userDetailsView: {paddingLeft: 10},
});

export default React.memo(StoryHeader);
