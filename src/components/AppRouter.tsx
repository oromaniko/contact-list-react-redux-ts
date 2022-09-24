import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes, RouteNames } from '../routes'
import { useTypedSelector } from '../hooks/useTypedSelector'

const AppRouter = () => {
    const { isAuth } = useTypedSelector((state) => state.auth)
    return (
        <Routes>
            {isAuth ? (
                <>
                    {privateRoutes.map(({ path, element }) => {
                        const Element = element
                        return (
                            <Route
                                path={path}
                                element={<Element />}
                                key={path}
                            />
                        )
                    })}
                    <Route
                        path='*'
                        element={<Navigate replace to={RouteNames.CONTACT} />}
                    />
                </>
            ) : (
                <>
                    {publicRoutes.map(({ path, element }) => {
                        const Element = element
                        return (
                            <Route
                                path={path}
                                element={<Element />}
                                key={path}
                            />
                        )
                    })}
                    <Route
                        path='*'
                        element={<Navigate replace to={RouteNames.LOGIN} />}
                    />
                </>
            )}
        </Routes>
    )
}

export default AppRouter
