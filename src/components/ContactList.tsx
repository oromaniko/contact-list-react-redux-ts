import { useEffect, useState } from 'react'
import { List } from 'antd'
import ContactItem from './ContactItem'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IContact } from '../models/contact'

interface ContactListProps {
    searchValue: string
}

const ContactList = ({ searchValue }: ContactListProps) => {
    const { isLoading, contacts } = useTypedSelector((state) => state.contacts)
    const [filteredContacts, setFilteredContacts] = useState<null | IContact[]>(
        null
    )

    useEffect(() => {
        if (searchValue) {
            const result = contacts.filter(
                ({ name: { first, last }, email }) =>
                    first.includes(searchValue) ||
                    last.includes(searchValue) ||
                    email.includes(searchValue)
            )
            setFilteredContacts(result)
        } else {
            setFilteredContacts(null)
        }
    }, [searchValue, contacts])

    return (
        <List
            loading={isLoading}
            split={true}
            dataSource={filteredContacts ? filteredContacts : contacts}
            renderItem={(contactInfo) => (
                <ContactItem
                    key={contactInfo.email}
                    contactInfo={contactInfo}
                />
            )}
        />
    )
}

export default ContactList
