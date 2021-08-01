import { FETCH_FAILED, FETCH_SUCCSES, FETCH_USER } from "./ActionTypes";

export const fetchUserAction = () => {
    return {
        type: FETCH_USER,
    }
}

export const fetchSucessAction = (reducerUser) => {
    return {
        type: FETCH_SUCCSES,
        reducerUser
    }
}

export const fetchFailedAction = (error) => {
    return {
        type: FETCH_FAILED,
        error
    }
}
