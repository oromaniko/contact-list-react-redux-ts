import {Form, Checkbox, Button, Alert, Input } from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/action-creators/auth";

const LoginForm = () => {
    const dispatch = useDispatch()
    const { errors, isLoading } = useTypedSelector((state) => state.auth)

    const handleLogin = (values: any) => {
        dispatch<any>(
            AuthActionCreators.login(values.username, values.password)
        )
    }

    const messages = {
        required: 'Please input your ${name}',
        string: {
            max: '${label} is too long',
            min: '${label} is too short',
        },
    }

    return (
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
                rules={[
                    {
                        required: true,
                        min: 2,
                    },
                    { max: 20 },
                ]}
            >
                <Input placeholder='user' />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        min: 4,
                    },
                    { max: 20 },
                ]}
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
                <Button type='primary' htmlType='submit' loading={isLoading}>
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
    )
}

export default LoginForm