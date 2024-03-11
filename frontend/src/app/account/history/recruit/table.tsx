"use client"
import React, { useEffect, useState } from 'react'
import { Space, Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fetchWithToken from '@/utils/fetchUtils';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/utils/formatUtils';


export default function TableZa({ data }: any) {
    const [tableData, setTableData] = useState([]);


    useEffect(() => setTableData(data), [data])


    const columns: ColumnsType<any> = [
        {
            title: 'หัวข้องาน',
            key: 'title',
            dataIndex: 'title',
            render: (_, record) => (
                <Space size="middle">
                    <span>{(record.job.title)}</span>
                </Space>
            ),
        },
        {
            title: 'ประเภทของงาน',
            key: 'jobType',
            dataIndex: 'jobType',
            render: (_, record) => (
                <Space size="middle">
                    <span>{(record.job.jobType)}</span>
                </Space>
            ),
        },

        {
            title: 'จำนวนเงินค่าจ้าง',
            key: 'salary',
            dataIndex: 'salary',
            render: (_, record) => (
                <Space size="middle">
                    <span>{(record.job.salary.toLocaleString())}</span>
                </Space>
            ),
        },
        {
            title: 'เวลา',
            key: 'date',
            dataIndex: 'date',
            render: (_, record) => (
                <Space size="middle">
                    <span>{(formatDateTime(record.createdAt))}</span>
                </Space>
            ),
        },
        {
            title: 'สถานะ',
            key: 'status',
            dataIndex: 'status',
        },

    ];

    return (
        <div>
            {/* {JSON.stringify(tableData)} */}
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
