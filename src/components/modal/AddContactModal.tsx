import React from "react";
import {Form, Modal} from "antd";
import {useActions} from "../../hooks/useActions";
import {IFormValues} from "../../types/contactForm";
import ContactForm from "./ContactForm";

type AddContactModalProps = {
    isModalVisible: boolean
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    username: string
}

const AddContactModal = ({isModalVisible, setIsModalVisible, username}: AddContactModalProps) => {
    const [form] = Form.useForm();
    const { addContact } = useActions()

    const onOk = () => {
        form.submit();
    };

    const handleAddContact = (values: IFormValues) => {
        addContact(values, username)
        setIsModalVisible(false)
    }

    return (
        <Modal
            title='Add contact'
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={onOk}
            destroyOnClose={true}
        >
            <ContactForm onFinish={handleAddContact} form={form}/>
        </Modal>
    )
}

export default AddContactModal;