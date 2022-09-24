import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { isObjEmpty } from '../../utils/Objecthelper';

const FriendsDetails = (props) => {
  const { params } = props.route;
  const friendsStore = useSelector(state => state.friendsReducer);
  const [friendDetails, setFriendDetails] = useState(params.friend ? params.friend : {});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      if (friendsStore.friendsList && friendsStore.friendsList.length > 0) {
        const deepLinkFriend = friendsStore.friendsList.filter(item => item.Id === params.id);

        if (deepLinkFriend.length > 0) {
          setFriendDetails(deepLinkFriend[0]);
        }
      }
    }
    setLoading(false);
  }, [params]);
  return (
    <View style={styles.container}>
      {isLoading ? <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={friendsStore.friendsList.length === 0} color="#1976D2" size={40} /></View> :
        !isObjEmpty(friendDetails) ? <View>
          <Text style={styles.title}>{`Id: ${friendDetails.Id ? friendDetails.Id : ""}`}</Text>
          <Text style={styles.title}>{`Name: ${friendDetails.Name}`}</Text>
          <Text style={styles.title}>{`Full Name: ${friendDetails.First_Name__c} ${friendDetails.Last_Name__c}`}</Text>
          <Text style={styles.title}>{`Age: ${friendDetails.Age__c} `}</Text>
        </View> : <Text>Sorry, No friend found!!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 16,
    margin: 10,
    fontWeight: '500'
  },
  activityIndicatorWrapper: {
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default FriendsDetails;