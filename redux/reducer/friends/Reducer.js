import initialState from "./InitialState";
import * as actionTypes from "./ActionTypes";

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_FETCH_FRIEND_LIST:
            return {
                ...state,
            }
        case actionTypes.ACTION_FETCH_FRIEND_LIST_RESULT:
            return {
                ...state,
                friendsList: action.payload.friendList
            }
        case actionTypes.ACTION_UPLOAD_NEW_FRIEND:
        case actionTypes.ACTION_STORE_NEW_FRIEND:
            return {
                ...state,
                friendsList: [...state.friendsList,...action.payload],
                isNewFriendUploaded: false,
                newFriends: [...action.payload, ...state.newFriends],
            }
        case actionTypes.ACTION_UPLOAD_NEW_FRIEND_RESULT:
            return {
                ...state,
                isNewFriendUploaded: action.payload.isNewFriendUploaded,
                newFriends:action.payload.isNewFriendUploaded ?  [] : state.newFriends,
            }        
        default:
            return state;
    }
}