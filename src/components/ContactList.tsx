import React from 'react'
import { List } from 'antd'
import Contact from './Contact'
import { useTypedSelector } from '../hooks/useTypedSelector'

const ContactList = () => {
    const { isLoading, contacts } = useTypedSelector((state) => state.contacts)

    return (
        <div className='h100 scrollable'>
            <List
                itemLayout='horizontal'
                loading={isLoading}
                split={true}
                dataSource={contacts}
                renderItem={(contactInfo) => (
                    <Contact
                        key={contactInfo.email}
                        contactInfo={contactInfo}
                    />
                )}
            />
        </div>
    )
}

export default ContactList
