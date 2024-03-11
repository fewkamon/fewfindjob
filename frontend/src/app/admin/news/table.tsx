"use client"
import React, { useEffect, useState } from 'react'
import { Space, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fetchWithToken from '@/utils/fetchUtils';
import toast from 'react-hot-toast';


export default function TableZa({ data }: any) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => setTableData(data), [data])

    interface News {
        id: number;
        topic: string;
        detail: string;
        image: string;
        status: string,
        createdAt: string;
        updatedAt: string;
    }

    const onChange = async (id: number) => {
        try {
            const response = await fetchWithToken(`/admin/news/${id.toString()}`, { method: "PATCH" }, 0)
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data["message"]);
            }
            const data = await response.json()
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const columns: ColumnsType<News> = [
        {
            title: 'หัวข้อ',
            dataIndex: 'topic',
            key: 'topic',
        },

        {
            title: 'ชื่อไฟล์รูป',
            key: 'image',
            dataIndex: 'image',
        },


        {
            title: 'สร้างเมื่อ',
            key: 'createdAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Switch checkedChildren="เปิด" unCheckedChildren="ปิด" defaultChecked={record.status === "PUBLIC"} onChange={() => onChange(record.id)} />
                </Space>
            ),
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
