import React from 'react'
import Login from '../pages/Login'
import ContactList from '../pages/ContactList'
import Logout from '../pages/Logout'

export interface IRoute {
    path: string
    element: React.ElementType
}

export enum RouteNames {
    LOGIN = 'login',
    LOGOUT = 'logout',
    CONTACT = '/',
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login },
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.CONTACT, element: ContactList },
    { path: RouteNames.LOGOUT, element: Logout },
]
