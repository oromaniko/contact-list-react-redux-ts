import {Alert, Layout, Menu} from 'antd'
import {ContactsOutlined, UserOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useTypedSelector} from '../hooks/useTypedSelector'
import {RouteNames} from "../routes";

const Navbar = () => {
    const navigate = useNavigate()
    const { isAuth } = useTypedSelector((state) => state.auth)
    const [showLoginAlert, setShowLoginAlert] = useState(false)

    const items = [
        {
            icon: <UserOutlined />,
            label: isAuth ? 'Logout' : 'Login',
            key: 1,
            onClick: () =>
                navigate(isAuth ? RouteNames.LOGOUT : RouteNames.LOGIN, { replace: true }),
        },
        {
            icon: <ContactsOutlined />,
            label: 'Contact List',
            key: 2,
            onClick: () => {
                if (isAuth) {
                    navigate(RouteNames.CONTACT, { replace: true })
                } else {
                    setShowLoginAlert(true)
                    setTimeout(() => setShowLoginAlert(false), 2000)
                }
            },
        },
    ]

    return (
        <Layout.Header>
            <Menu
                theme='dark'
                mode='horizontal'
                style={{ justifyContent: 'flex-end' }}
                selectable={false}
                items={items}
            />
            {showLoginAlert && (
                <Alert
                    message='You have to log in first'
                    type='error'
                    closable
                />
            )}
        </Layout.Header>
    )
}

export default Navbar
