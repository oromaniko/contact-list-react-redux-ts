import {
    ContactsAction,
    ContactsActionTypes,
    ContactsState,
    SetContactsAction,
    SetErrorAction,
    SetIsLoadingAction,
} from '../../types/contacts'
import { IContact } from '../../models/contact'
import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppDispatch } from '../index'
import axios from 'axios'
import { IFormValues } from '../../types/contactForm'
import { transformToContact } from '../../utils/transform'

const fetchContacts: ActionCreator<
    ThunkAction<Promise<void>, ContactsState, null, ContactsAction>
> = (user: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(ContactsActionCreators.setIsLoading(true))
        setTimeout(async () => {
            const json = localStorage.getItem(user)
            if (json) {
                dispatch(ContactsActionCreators.setContacts(JSON.parse(json)))
            } else {
                const response = await axios.get<IContact[]>(
                    './initialContacts.json'
                )
                debugger
                localStorage.setItem(user, JSON.stringify(response.data))
                dispatch(ContactsActionCreators.setContacts(response.data))
            }
            dispatch(ContactsActionCreators.setIsLoading(false))
        }, 1000)
    } catch (e: any) {
        dispatch(ContactsActionCreators.setErrors(e))
    }
}

const addContact: ActionCreator<
    ThunkAction<Promise<void>, ContactsState, null, ContactsAction>
> = (values: IFormValues, username: string) => async (dispatch: AppDispatch) => {
    const contact: IContact = transformToContact(values)
    const json = localStorage.getItem(username) || '[]'
    const updatedContactList = [contact, ...JSON.parse(json)]
    dispatch(ContactsActionCreators.setContacts(updatedContactList))
    localStorage.setItem(username, JSON.stringify(updatedContactList))
}

const deleteContact: ActionCreator<
    ThunkAction<Promise<void>, ContactsState, null, ContactsAction>
> =
    (emailToDelete: string, username: string) =>
    async (dispatch: AppDispatch) => {
        const json = localStorage.getItem(username) || '[]'
        const contactList = JSON.parse(json) as IContact[]
        const updatedContactList = contactList.filter(
            ({ email }) => email !== emailToDelete
        )
        dispatch(ContactsActionCreators.setContacts(updatedContactList))
        localStorage.setItem(username, JSON.stringify(updatedContactList))
    }

const editContact: ActionCreator<
    ThunkAction<Promise<void>, ContactsState, null, ContactsAction>
> =
    (values: IFormValues, username: string, emailToEdit: string) =>
    async (dispatch: AppDispatch) => {
        dispatch(ContactsActionCreators.setIsLoading(true))
        setTimeout(async () => {
            const json = localStorage.getItem(username) || '[]'
            const contactList = JSON.parse(json) as IContact[]
            const updatedContactList = contactList.map((item) => {
                const { email, picture } = item
                return email === emailToEdit
                    ? transformToContact(values, picture)
                    : item
            })
            dispatch(ContactsActionCreators.setContacts(updatedContactList))
            localStorage.setItem(username, JSON.stringify(updatedContactList))
            dispatch(ContactsActionCreators.setIsLoading(false))
        }, 1000)
    }

export const ContactsActionCreators = {
    setContacts: (contacts: IContact[]): SetContactsAction => ({
        type: ContactsActionTypes.SET_CONTACTS,
        payload: contacts,
    }),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({
        type: ContactsActionTypes.SET_IS_LOADING,
        payload: loading,
    }),
    setErrors: (error: string): SetErrorAction => ({
        type: ContactsActionTypes.SET_ERROR,
        payload: error,
    }),
    addContact: addContact,
    deleteContact: deleteContact,
    editContact: editContact,
    fetchContacts: fetchContacts,
}
