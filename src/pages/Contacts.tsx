import { Button, Input, Layout, Row } from 'antd'
import ContactList from '../components/ContactList'
import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddContactModal from '../components/modal/AddContactModal'

const Contacts = () => {
    const { username } = useTypedSelector((state) => state.auth.user)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const { fetchContacts } = useActions()

    useEffect(() => {
        fetchContacts(username)
    }, [])

    return (
        <Layout>
            <Row justify='center' className='pd16'>
                <Button type='primary' onClick={() => setIsModalVisible(true)}>
                    Add contact
                </Button>
            </Row>
            <AddContactModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                username={username}
            />
            <div className='h100 scrollable'>
                <Row justify='start'>
                    <Input.Search
                        allowClear
                        enterButton
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Row>
                <ContactList searchValue={searchValue} />
            </div>
        </Layout>
    )
}

export default Contacts
