import { put, takeEvery, all, call } from "redux-saga/effects";
import * as FriendAction from "./ActionTypes";
import * as FriendServices from "../../../services/FriendsService";

function* fetchFriendList() {
    let payload = {
        status: false,
        message: "No friends found"
    }
    try {
        const response = yield call(FriendServices.getFriendsList);

        if (response.status && response.data) {
            payload = {
                ...payload,
                friendList: response.data
            }
        }
        yield put({ type: FriendAction.ACTION_FETCH_FRIEND_LIST_RESULT, payload });
    } catch (e) {
        yield put({ type: FriendAction.ACTION_FETCH_FRIEND_LIST_RESULT, payload });
    }
}

function* uploadNewFriend(action) {
    let payload = {
        status: false,
        message: "New Friend is not uploaded",
        isNewFriendUploaded: false
    }
    try {
        action.payload.forEach(item=> delete item.Id);
        const reqPayload = [...action.payload]
        const response = yield call(FriendServices.addNewFriend, reqPayload);

        if (response.status) {
            payload = {
                ...payload,
                isNewFriendUploaded: true,
                status: true,
                message: "New Friend is uploaded",
            }
        }
        yield put({ type: FriendAction.ACTION_UPLOAD_NEW_FRIEND_RESULT, payload });
    } catch (e) {
        yield put({ type: FriendAction.ACTION_UPLOAD_NEW_FRIEND_RESULT, payload });
    }
}


export function* friendsActionWatcher() {
    yield all([
        yield takeEvery(FriendAction.ACTION_FETCH_FRIEND_LIST, fetchFriendList),
        yield takeEvery(FriendAction.ACTION_UPLOAD_NEW_FRIEND, uploadNewFriend),
    ]);
}