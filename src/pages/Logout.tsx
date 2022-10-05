import React from 'react'
import { Layout, Row, Button, Typography, Card } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Logout = () => {
    const { logout } = useActions()
    const { username } = useTypedSelector((state) => state.auth.user)

    const handleLogout = () => {
        logout()
    }

    return (
        <Layout>
            <Row justify='center' align='middle' className='h100' wrap={true}>
                <Card bodyStyle={{ textAlign: 'center' }}>
                    <div>
                        <Typography.Title level={2}>
                            {`${username}, are you sure you want to logout?`}
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
                </Card>
            </Row>
        </Layout>
    )
}

export default Logout
