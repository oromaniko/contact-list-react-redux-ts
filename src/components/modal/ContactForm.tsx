import React from "react";
import {Form, FormInstance, Input, Radio} from "antd";
import {rules} from "../../utils/rules";
import {IFormValues} from "../../types/contactForm";

type ContactFormProps = {
    onFinish: (values: IFormValues) => void
    form: FormInstance
    initialValues?: IFormValues | undefined
}

const ContactForm = ({onFinish, form, initialValues}: ContactFormProps) => {
    const messages = {
        required: 'Please input your ${label}',
        string: {
            max: '${label} is too long',
            min: '${label} is too short',
        },
    }

    return (
        <Form
            name='basic'
            form={form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 30,
            }}
            initialValues={initialValues}
            onFinish={onFinish}
            autoComplete='off'
            validateMessages={messages}
            preserve={false}
            className='position-rel'
        >
            <Form.Item
                label='First name'
                name='first'
                rules={[rules.required(2), rules.max(15)]}
            >
                <Input placeholder='First name' />
            </Form.Item>

            <Form.Item
                label='Last name'
                name='last'
                rules={[rules.required(2), rules.max(15)]}
            >
                <Input placeholder='Last name' />
            </Form.Item>

            <Form.Item
                label='Email'
                name='email'
                rules={[rules.required(2), rules.max(30)]}
            >
                <Input placeholder='Last name' />
            </Form.Item>

            <Form.Item
                label='Gender'
                name='gender'
                rules={[rules.required(0)]}
            >
                <Radio.Group>
                    <Radio value={'male'}>Male</Radio>
                    <Radio value={'female'}>Female</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}

export default ContactForm;