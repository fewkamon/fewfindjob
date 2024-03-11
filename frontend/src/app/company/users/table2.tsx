"use client"

import React, { useEffect, useState } from 'react'
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import getLocation from '@/utils/location';
import Image from 'next/image'
import fetchWithToken from '@/utils/fetchUtils';
const BASE_URL = process.env.BACKEND_URL;
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page({ data }: any) {

    const router = useRouter()

    const [data1, setData1] = useState<any>(data)
    const [open, setOpen] = useState(false);
    const [dataOne, setDataOne] = useState<any>({});
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        setData1(data)
    }, [data])

    const dest = async (daa: any) => {
        setDataOne(daa)
        setId(daa.id)
        setOpen(true)
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleOk = async (status: string) => {
        try {
            const response = await fetchWithToken(`/job/company/recruit/file`, { method: "PATCH", body: JSON.stringify({ recruitid: id, type: status }) }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            await setOpen(false)
            await toast.success("เปลี่ยนสถานะเรียบร้อย")
            router.refresh();
        } catch (err: any) {
            toast.error(err.message)
        }
    };




    interface Location {
        id: number;
        address: string;
        district: string;
        subdistrict: string;
        province: string;
        postalCode: number;
        jobseekerId: number;
        companyId: number | null;
    }

    interface Skill {
        id: number;
        th_typing: number;
        eng_typing: number;
        driving_ability: string[];
        private_vehicle: string[];
        other_special_skills: string;
        achievements: string;
        other_experience: string;
        references: string;
        jobseekerId: number;
    }

    interface Jobseeker {
        id: number;
        firstName: string;
        lastName: string;
        userId: number;
        dob: string;
        gender: string;
        phonenumber: string;
        image: string;
        skillId: number | null;
        location: Location;
        skill: Skill;
    }

    interface Job {
        id: number;
        title: string;
        detail: string;
        amount: number;
        salary: number;
        jobType: string;
        qualification: string;
        how_to_apply: string;
        contact: string;
        createdAt: string;
        updatedAt: string;
        status: string;
        companyId: number;
    }

    interface JobApplication {
        id: number;
        jobId: number;
        jobseekerId: number;
        companyId: number;
        status: string;
        createdAt: string;
        updatedAt: string;
        job: Job;
        jobseeker: Jobseeker;
    }

    const columns: ColumnsType<JobApplication> = [
        {
            title: 'หัวข้อ',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => <a>{record.job.title}</a>,
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'เวลา',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => dest(record)}>ดูรายละเอียด</a>
                </Space>
            ),
        },
    ];


    return (
        <div>
            <p className='text-[22px] text-gray-700 text-center font-semibold'>คนที่สมัครงานแบบประวัติ</p>
            <br />
            <Table scroll={{ x: '992px' }} columns={columns} dataSource={data1} />

            <Modal
                open={open}
                onCancel={handleCancel}
                title={""}
                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                footer={[
                    <Button key="back" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("SUCCESS")}>
                        ผ่านการคัดเลือก
                    </Button>,
                    <Button key="back" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("REJECTED")}>
                        ไม่ผ่านการคัดเลือก
                    </Button>,
                ]}
            >
                <p>
                    <div className="bg-white mt-4 rounded-lg p-2 ">
                        <p>Email: {dataOne.email}</p>
                        <p>ประวัติ: <a href={`${BASE_URL}/file/${dataOne.file}`}
                        >กดที่นี้</a></p>
                    </div>

                </p>
            </Modal>
        </div>
    )
}
