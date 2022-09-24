import axios from "axios";
import { API_BASE_URL, GET_FRIEND_LIST } from "../utils/APIConstants";

export const getFriendsList = () => {
    return axios.get(`${API_BASE_URL}${GET_FRIEND_LIST}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

export const addNewFriend = (payload) => {
   
    return axios.post(`${API_BASE_URL}${GET_FRIEND_LIST}`, payload,)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}