import React from 'react'
import { Layout, Row, Button, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../store'
import { AuthActionCreators } from '../store/action-creators/auth'

const Logout = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch<any>(AuthActionCreators.logout())
    }

    return (
        <Layout>
            <Row justify='center' align='middle' className='h100' wrap={true}>
                <div>
                    <Typography.Title level={2}>
                        {localStorage.getItem('username') +
                            ', are you sure you want to logout?'}
                    </Typography.Title>
                </div>
                <Button
                    type='primary'
                    icon={<LogoutOutlined />}
                    size='large'
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Row>
        </Layout>
    )
}

export default Logout
