import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendList, uploadNewFriend } from '../../redux/reducer/friends/Actions';
import { isObjEmpty } from '../../utils/Objecthelper';
import NetInfo from "@react-native-community/netinfo";
import { generateUID } from '../../utils/Helper';
import { showShortToast } from '../../utils/Toast';
import { IS_NEW_OFFLINE_FRIENDS_AVAILABLE, NEW_OFFLINE_FRIENDS_LIST } from '../../utils/AsyncStorageKeyConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Friends = (props) => {
    const friendsStore = useSelector(state => state.friendsReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {

            if (state.isConnected === true) {
                AsyncStorage.getItem(IS_NEW_OFFLINE_FRIENDS_AVAILABLE).then(isNewOfflineFrinedAvailable => {
                    AsyncStorage.getItem(NEW_OFFLINE_FRIENDS_LIST).then(offlineFriends => {

                        if (isNewOfflineFrinedAvailable && offlineFriends !== undefined && offlineFriends != null && offlineFriends.length > 0) {
                            dispatch(uploadNewFriend(JSON.parse(offlineFriends)));
                            AsyncStorage.removeItem(IS_NEW_OFFLINE_FRIENDS_AVAILABLE);
                            AsyncStorage.removeItem(NEW_OFFLINE_FRIENDS_LIST);
                        }
                    });
                });
            }

        });

        if (friendsStore.friendsList && friendsStore.friendsList.length == 0) dispatch(fetchFriendList());

        return (() => {
            unsubscribe();
        })
    }, []);


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => redirectToDetails(item)}>
            <View style={styles.item}>
                <Text style={styles.title}>{`Name: ${item.Name}`}</Text>
                <Text style={styles.title}>{`Full Name: ${item.First_Name__c} ${item.Last_Name__c}`}</Text>
            </View>
        </TouchableOpacity>
    );

    const redirectToDetails = (item) => {
        props.navigation.navigate("FriendsDetails", { friend: item });
    }

    const redirectToAddFriend = (item) => {
        props.navigation.navigate("AddFriend");
    }

    return (
        <SafeAreaView style={styles.container}>
            {friendsStore.friendsList && friendsStore.friendsList.length > 0 ? (<FlatList
                data={friendsStore.friendsList.reverse()}
                renderItem={renderItem}
                keyExtractor={item => item.Id ? item.Id : generateUID(18)}
            />) : <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator animating={friendsStore.friendsList.length === 0 } color="#1976D2" size={40} /></View>}

            <TouchableOpacity style={styles.floatingbtn} onPress={redirectToAddFriend}>
                <Text style={styles.floatingtxt}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    floatingbtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: '#1976D2',
        borderRadius: 100,
    },
    floatingtxt: {
        fontSize: 30,
        color: "fff"
    },
    activityIndicatorWrapper: {
        borderRadius: 10,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});

export default Friends;