"use client"
import React, { useEffect, useState } from 'react'
import { Space, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fetchWithToken from '@/utils/fetchUtils';
import toast from 'react-hot-toast';
import LoadableText from '@/components/TextLoadmore';


export default function TableZa({ data }: any) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => setTableData(data), [data])

    interface Message {
        id: number;
        topic: string;
        name: string;
        email: string;
        phonenumber: string;
        message: string;
        createdAt: string;
        updatedAt: string;
    }

    const columns: ColumnsType<Message> = [
        {
            title: 'หัวข้อ',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'ข้อความ',
            dataIndex: 'message',
            key: 'message',
            render: (_, record) => (
                <Space size="middle">
                    <span>
                        <LoadableText longText={record.message} length={30}  />
                    </span>
                </Space>
            ),
        },
        {
            title: 'สร้างเมื่อ',
            key: 'createdAt',
            dataIndex: 'createdAt',
        },



    ];


    return (
        <div>
            <Table
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                scroll={{ x: '992px' }}
                columns={columns}
                rowKey='id'
                dataSource={tableData}
            />
        </div>
    )
}
