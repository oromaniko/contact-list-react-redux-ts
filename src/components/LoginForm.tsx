import { Form, Checkbox, Button, Alert, Input, Card } from 'antd'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { rules } from '../utils/rules'
import { useActions } from '../hooks/useActions'

const LoginForm = () => {
    const { login } = useActions()
    const { errors, isLoading } = useTypedSelector((state) => state.auth)

    const handleLogin = (values: any) => {
        login(values.username, values.password)
    }

    const messages = {
        required: 'Please input your ${name}',
        string: {
            max: '${label} is too long',
            min: '${label} is too short',
        },
    }

    return (
        <Card title='Welcome!' headStyle={{ textAlign: 'center' }}>
            <Form
                name='basic'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 30,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleLogin}
                autoComplete='off'
                validateMessages={messages}
                className='position-rel'
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[rules.required(2), rules.max(20)]}
                >
                    <Input placeholder='user' />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[rules.required(4), rules.max(20)]}
                >
                    <Input.Password placeholder='1234' />
                </Form.Item>

                <Form.Item
                    name='remember'
                    valuePropName='checked'
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isLoading}
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
