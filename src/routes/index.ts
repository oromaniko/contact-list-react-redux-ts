import React from 'react'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Contacts from "../pages/Contacts";

export interface IRoute {
    path: string
    element: React.ElementType
}

export enum RouteNames {
    LOGIN = '/login',
    LOGOUT = '/logout',
    CONTACT = '/',
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: Login },
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.CONTACT, element: Contacts },
    { path: RouteNames.LOGOUT, element: Logout },
]
