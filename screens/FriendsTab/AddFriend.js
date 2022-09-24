import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BaseTextInput from '../../components/BaseTextInput';
import { showShortToast } from '../../utils/Toast';
import { PLEASE_ENTER } from '../../utils/ValidationErrorsMsgConstants';
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from 'react-redux';
import { storeNewFriend, uploadNewFriend } from '../../redux/reducer/friends/Actions';
import { generateUID } from '../../utils/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IS_NEW_OFFLINE_FRIENDS_AVAILABLE, NEW_OFFLINE_FRIENDS_LIST } from '../../utils/AsyncStorageKeyConstants';

const AddFriend = (props) => {
    const friendsStore = useSelector(state => state.friendsReducer);
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const nameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const ageRef = useRef();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        if (checkValidation()) {
            const payload = {
                "attributes": {
                    "type": "Friend__c"
                },
                "Id": generateUID(18),
                "Name": `FR-${name}`,
                "First_Name__c": firstName,
                "Last_Name__c": lastName,
                "Age__c": age

            }

            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    dispatch(uploadNewFriend([payload]));
                    goBack();
                } else {
                    AsyncStorage.setItem(IS_NEW_OFFLINE_FRIENDS_AVAILABLE, "true").then(res => {
                        AsyncStorage.getItem(NEW_OFFLINE_FRIENDS_LIST).then(offlineFriends => {
                            if (offlineFriends !== undefined && offlineFriends != null && offlineFriends.length > 0) {
                                AsyncStorage.setItem(NEW_OFFLINE_FRIENDS_LIST, JSON.stringify([payload, ...JSON.parse(offlineFriends)]))
                            } else {
                                AsyncStorage.setItem(NEW_OFFLINE_FRIENDS_LIST, JSON.stringify([payload]))
                            }
                            dispatch(storeNewFriend([payload]))
                            goBack();
                        });
                    })
                }
            });
        }
    }

    const goBack = () => {
        showShortToast("New friend is added!!");
        props.navigation.goBack();
    }

    const checkValidation = () => {
        const validationTypes = [{ type: "name", value: name }, { type: "firstName", value: firstName }, { type: "lastName", value: lastName }, { type: "age", value: age }]

        const isValid = validationTypes.filter((item) => item.value.length === 0)

        if (isValid.length === 0) {
            return true;
        } else {
            showShortToast(`${PLEASE_ENTER} ${isValid[0].type}`)
            return false
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <BaseTextInput
                ref={nameRef} value={name}
                onChangeText={setName}
                placeholder={"Name"}
                nextRef={firstNameRef}
                keyboardType="numeric"
                maxLength={5} />
            <BaseTextInput
                ref={firstNameRef}
                value={firstName}
                onChangeText={setFirstName}
                placeholder={"First Name"}
                nextRef={lastNameRef} />
            <BaseTextInput
                ref={lastNameRef}
                value={lastName}
                onChangeText={setLastName}
                placeholder={"Last Name"}
                nextRef={ageRef} />
            <BaseTextInput
                ref={ageRef}
                value={age}
                onChangeText={setAge}
                placeholder={"Age"}
                keyboardType="numeric"
                maxLength={2} />

            <TouchableOpacity style={{ backgroundColor: "#1976D2", padding: 15, alignItems: "center", borderRadius: 15, margin: 15 }} onPress={onSubmit}>
                <Text style={{ color: "#fff" }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddFriend;