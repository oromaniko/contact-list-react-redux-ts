import React from 'react'
import { Form, Modal } from 'antd'
import { useActions } from '../../hooks/useActions'
import { IFormValues } from '../../types/contactForm'
import ContactForm from './ContactForm'

type EditContactModalProps = {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    username: string
    initialValues: IFormValues
}

const EditContactModal = ({
    isModalVisible,
    setIsModalVisible,
    username,
    initialValues,
}: EditContactModalProps) => {
    const [form] = Form.useForm()
    const { editContact } = useActions()

    const onOk = () => {
        form.submit()
    }

    const handleEditContact = (values: IFormValues) => {
        editContact(values, username, initialValues.email)
        setIsModalVisible(false)
    }

    return (
        <Modal
            title='Edit contact'
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={onOk}
            destroyOnClose={true}
        >
            <ContactForm
                onFinish={handleEditContact}
                form={form}
                initialValues={initialValues}
            />
        </Modal>
    )
}

export default EditContactModal
