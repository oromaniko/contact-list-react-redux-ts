import {
    AuthAction,
    AuthActionTypes,
    AuthState,
    SetErrorAction,
    SetIsAuthAction,
    SetIsLoadingAction,
    SetUserAction,
} from '../../types/auth'
import { IUser } from '../../models/user'
import { AppDispatch } from '../index'
import axios from 'axios'
import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

const login: ActionCreator<
    ThunkAction<Promise<void>, AuthState, null, AuthAction>
> = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(AuthActionCreators.setIsLoading(true))
        dispatch(AuthActionCreators.setErrors(''))
        setTimeout(async () => {
            const response = await axios.get<IUser[]>('./users.json')
            const mockUser = response.data.find(
                (user) =>
                    user.username === username && user.password === password
            )
            if (mockUser) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('username', mockUser.username)
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setUser(mockUser))
            } else {
                dispatch(AuthActionCreators.setErrors('User not found'))
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        }, 1500)
    } catch (e: any) {
        dispatch(AuthActionCreators.setErrors(e.message))
    }
}

const logout: ActionCreator<
    ThunkAction<Promise<void>, AuthState, null, AuthAction>
> = () => async (dispatch: AppDispatch) => {
    try {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))
    } catch (e: any) {
        console.error(e)
    }
}

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionTypes.SET_USER,
        payload: user,
    }),
    setIsAuth: (auth: boolean): SetIsAuthAction => ({
        type: AuthActionTypes.SET_AUTH,
        payload: auth,
    }),
    setErrors: (error: string): SetErrorAction => ({
        type: AuthActionTypes.SET_ERROR,
        payload: error,
    }),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({
        type: AuthActionTypes.SET_IS_LOADING,
        payload: loading,
    }),
    login: login,
    logout: logout,
}
