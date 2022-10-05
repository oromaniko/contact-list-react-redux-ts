import {IContact} from "../models/contact";

export interface ContactsState {
    contacts: IContact[]
    isLoading: boolean
    errors: string
}

export enum ContactsActionTypes {
    SET_CONTACTS = 'SET_CONTACTS',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
}

export interface SetContactsAction {
    type: ContactsActionTypes.SET_CONTACTS
    payload: IContact[]
}

export interface SetIsLoadingAction {
    type: ContactsActionTypes.SET_IS_LOADING
    payload: boolean
}

export interface SetErrorAction {
    type: ContactsActionTypes.SET_ERROR
    payload: string
}

export type ContactsAction =
    | SetContactsAction
    | SetIsLoadingAction
    | SetErrorAction




