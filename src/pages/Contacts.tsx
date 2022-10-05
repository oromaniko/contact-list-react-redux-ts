import {Button, Layout, Row } from "antd";
import ContactList from "../components/ContactList";
import {useEffect, useState} from "react";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import AddContactModal from "../components/modal/AddContactModal";

const Contacts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { fetchContacts } = useActions()
    const { username } = useTypedSelector(state => state.auth.user)

    useEffect(() => {
        fetchContacts(username)
    }, [])

    return (
        <Layout>
            <Row justify='center' className='pd16'>
                <Button type='primary' onClick={() => setIsModalVisible(true)}>Add contact</Button>
            </Row>
            <AddContactModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} username={username}/>
            <ContactList />
        </Layout>
    )
}

export default Contacts;