import { Form, Button, Alert, Input, Card, Tooltip } from 'antd'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { rules } from '../utils/rules'
import { useActions } from '../hooks/useActions'
import {
    UserOutlined,
    LockOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'
import { AuthValues } from '../types/auth'

const LoginForm = () => {
    const { login } = useActions()
    const { errors, isLoading } = useTypedSelector((state) => state.auth)

    const handleLogin = (values: AuthValues) => {
        login(values.username, values.password)
    }

    const messages = {
        required: 'Please input your ${name}',
        string: {
            max: '${name} is too long',
            min: '${name} is too short',
        },
    }

    return (
        <Card
            title='Welcome!'
            headStyle={{ textAlign: 'center' }}
            style={{ width: 300 }}
        >
            <Form
                name='login'
                initialValues={{
                    remember: true,
                }}
                onFinish={handleLogin}
                autoComplete='off'
                validateMessages={messages}
            >
                <Form.Item
                    name='username'
                    rules={[rules.required(2), rules.max(20)]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder='Username'
                        suffix={
                            <Tooltip title='user | admin - 1234'>
                                <InfoCircleOutlined
                                    style={{ color: 'rgba(0,0,0,.45)' }}
                                />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[rules.required(4), rules.max(20)]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder='Password'
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isLoading}
                        block
                    >
                        Submit
                    </Button>
                </Form.Item>

                {errors && (
                    <Alert
                        message={errors}
                        type='error'
                        closable
                        className='position-abs'
                    />
                )}
            </Form>
        </Card>
    )
}

export default LoginForm
