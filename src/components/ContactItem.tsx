import React, { useState } from 'react'
import { Avatar, List } from 'antd'
import EditContactModal from './modal/EditContactModal'
import { IContact } from '../models/contact'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface ContactProps {
    contactInfo: IContact
}

const ContactItem = ({
    contactInfo: { email, name, picture, gender },
}: ContactProps) => {
    const { username } = useTypedSelector((state) => state.auth.user)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { deleteContact } = useActions()

    const handleDeleteContact = (email: string) => {
        deleteContact(email, username)
    }

    return (
        <List.Item
            key={email}
            actions={[
                <a onClick={() => setIsModalVisible(true)}>edit</a>,
                <a onClick={() => handleDeleteContact(email)}>delete</a>,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={picture} />}
                title={`${name.first} ${name.last}`}
                description={email}
            />
            <EditContactModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                username={username}
                initialValues={{
                    email,
                    gender,
                    first: name.first,
                    last: name.last,
                }}
            />
        </List.Item>
    )
}

export default ContactItem
