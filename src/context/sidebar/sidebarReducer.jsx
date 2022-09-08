import {  EXTENDED } from "../../types";

export const sidebarReducer = (state = {}, action) => {
    switch (action.type) {
        case EXTENDED:
            return {
                ...state,
                extended: !state.extended
            }
        default:
            return state;
    }
}