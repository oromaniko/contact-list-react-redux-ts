import {Button, Layout, Modal, Row} from "antd";
import ContactList from "../components/ContactList";
import {useState} from "react";

const Contacts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <Layout>
            <Row justify='center'>
                <Button type='primary' onClick={() => setIsModalVisible(true)}>Add contact</Button>
            </Row>
            <Modal
                title='Add contact'
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
            >

            </Modal>
            <ContactList contacts={[]}/>
        </Layout>
    )
}

export default Contacts;