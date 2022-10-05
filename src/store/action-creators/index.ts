import { AuthActionCreators } from './auth'
import { ContactsActionCreators } from './contacts'

export const allActionCreators = {
    ...AuthActionCreators,
    ...ContactsActionCreators,
}
