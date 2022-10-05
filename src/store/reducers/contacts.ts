import {ContactsAction, ContactsActionTypes, ContactsState} from "../../types/contacts";
import {IContact} from "../../models/contact";

const initialState: ContactsState = {
    contacts: [] as IContact[],
    isLoading: false,
    errors: ''
}

export default function contactsReducer(
    state = initialState,
    action: ContactsAction
): ContactsState {
    switch (action.type) {
        case ContactsActionTypes.SET_CONTACTS:
            return { ...state, contacts: action.payload }
        case ContactsActionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case ContactsActionTypes.SET_ERROR:
            return { ...state, errors: action.payload }
        default:
            return state
    }
}