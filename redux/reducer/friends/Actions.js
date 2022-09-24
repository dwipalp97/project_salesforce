import {
    ACTION_FETCH_FRIEND_LIST,
    ACTION_FETCH_FRIEND_LIST_RESULT,
    ACTION_STORE_NEW_FRIEND,
    ACTION_UPLOAD_NEW_FRIEND,
    ACTION_UPLOAD_NEW_FRIEND_RESULT,
} from "./ActionTypes";


export function fetchFriendList() {
    return {
        type: ACTION_FETCH_FRIEND_LIST
    }
}

export function fetchFriendListResult(payload) {
    return {
        type: ACTION_FETCH_FRIEND_LIST_RESULT,
        payload
    }
}

export function storeNewFriend(payload) {
    return {
        type: ACTION_STORE_NEW_FRIEND,
        payload
    }
}

export function uploadNewFriend(payload) {
    return {
        type: ACTION_UPLOAD_NEW_FRIEND,
        payload
    }
}

export function uploadNewFriendResult(payload) {
    return {
        type: ACTION_UPLOAD_NEW_FRIEND_RESULT,
        payload
    }
}