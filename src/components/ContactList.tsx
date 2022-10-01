import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton } from 'antd'
import {IContact} from "../types/contact";

interface ContactListProps {
    contacts: IContact[];
}

const ContactList = (contacts: ContactListProps) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return
        }

        setLoading(true)
        fetch(
            'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
        )
            .then((res) => res.json())
            .then((body) => {
                setData([...body.results])
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <div className='h100 scrollable'>
            <List
                itemLayout='horizontal'
                split={true}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.email} actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={item.name.last}
                            description={item.email}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ContactList
