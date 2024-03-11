"use client"

import fetchWithToken from '@/utils/fetchUtils';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default function Recruitment() {

    const [data, setData] = useState<JobPosting[]>([])
    const [dataOne, setDataone] = useState<JobPosting>()
    const [open, setOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        salary: 0,
        employeeCount: 0,
        description: '',
        qualifications: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const showModal = (record: any) => {
        setDataone(record)
        setOpen(true);
    };

    interface JobPosting {
        id: number;
        title: string;
        detail: string;
        amount: string;
        salary?: string;
        jobType: string;
        qualification: string;
        how_to_apply: string;
        contact: string;
        createdAt: string;
        updatedAt: string;
        status: string;
        companyId: number;
    }

    const handleOk = async (status: string) => {
        try {
            const response = await fetchWithToken(`/admin/company/job/${dataOne?.id}/${status}`, { method: "PATCH" }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            fetchData()
            await setOpen(false)
            await toast.success("เปลี่ยนสถานะเรียบร้อย")
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const columns: ColumnsType<JobPosting> = [
        {
            title: 'หัวข้องาน',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'ประเภทของงาน',
            key: 'jobType',
            dataIndex: 'jobType',
        },

        {
            title: 'จำนวนเงินค่าจ้าง',
            key: 'salary',
            dataIndex: 'salary',
        },
        {
            title: 'จำนวนที่รับพนักงาน',
            key: 'amount',
            dataIndex: 'amount',
        },
        {
            title: 'สถานะ',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModal(record)}>แก้ไขรายละเอียด</a>
                </Space>
            ),
        },

    ];

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetchWithToken("/admin/company/job/pending", { method: "GET" }, 0)
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data["message"]);
            }
            const data = await response.json()
            setData(data)
        } catch (err: any) {
            toast.error(err.message)
        }
    }


    return (
        <div>

            <p className='text-[25px] font-semibold'>ประกาศงาน</p>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">


                <>
                    <div className="mt-5">


                        <Modal
                            open={open}
                            onCancel={handleCancel}
                            width={1000}
                            title={"ข้อมูลโพสต์"}
                            style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                            footer={[
                                <Button key="back" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("APPROVE")}>
                                    อนุมัติโพสต์
                                </Button>,
                                <Button key="submit" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("DISAPPROVAL")}>
                                    ไม่อนุมัติโพสต์
                                </Button>,
                            ]}
                        >
                            <p>

                                <div className="bg-white mt-4 rounded-lg p-2 ">
                                    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-12 gap-y-8 mt-6 mb-6 md:mx-9 ">


                                        <div className="col-span-6">
                                            <p className='text-[16px]'>หัวข้องาน*</p>
                                            <input
                                                value={dataOne?.title}
                                                onChange={(e) => {
                                                    setDataone((prevData: any) => ({
                                                        ...prevData,
                                                        title: e.target.value
                                                    }));
                                                }}
                                                readOnly
                                                type="text"
                                                name="title"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: นักพัฒนาซอฟต์แวร์"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <p className='text-[16px]'>ประเภทของงาน*</p>
                                            <select
                                                value={dataOne?.jobType}
                                                onChange={(e) => {
                                                    setDataone((prevData: any) => ({
                                                        ...prevData,
                                                        jobType: e.target.value
                                                    }));
                                                }}
                                                disabled
                                                name="type"
                                                className="mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-3.5"
                                                required
                                            >
                                                <option value="">-- เลือก --</option>
                                                <option value="FULL_TIME">เต็มเวลา</option>
                                                <option value="PART_TIME">ไม่เต็มเวลา</option>
                                                <option value="INTERNSHIP">ฝึกงาน</option>
                                                <option value="FREELANCE">ฟรีแลนซ์</option>
                                            </select>

                                        </div>

                                        <div className="col-span-6">
                                            <p className='text-[16px]'>จำนวนเงินค่าจ้าง*</p>
                                            <input
                                                value={dataOne?.salary}
                                                onChange={(e) => {
                                                    setDataone((prevData: any) => ({
                                                        ...prevData,
                                                        salary: e.target.value
                                                    }));
                                                }}
                                                readOnly
                                                type="number"
                                                name="salary"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: 12500"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <p className='text-[16px]'>จำนวนที่รับพนักงาน</p>
                                            <input
                                                value={dataOne?.amount}
                                                onChange={(e) => {
                                                    setDataone((prevData: any) => ({
                                                        ...prevData,
                                                        amount: e.target.value
                                                    }));
                                                }}
                                                readOnly
                                                type="number"
                                                name="employeeCount"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: 3"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <p className='text-[16px]'>รายละเอียดของงาน*</p>
                                            <textarea
                                                value={dataOne?.detail}
                                                onChange={(e) => {
                                                    setDataone((prevData: any) => ({
                                                        ...prevData,
                                                        detail: e.target.value
                                                    }));
                                                }}
                                                readOnly
                                                rows={5}
                                                name="description"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา "
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="col-span-6">
                                            <p className='text-[16px]'>คุณสมบัติ</p>
                                            <textarea
                                                value={dataOne?.qualification}
                                                readOnly
                                                rows={5}
                                                name="description"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา "
                                                required
                                            ></textarea>
                                        </div>


                                        <div className="col-span-6">
                                            <p className='text-[16px]'>วิธีการสมัคร</p>
                                            <textarea
                                                value={dataOne?.how_to_apply}
                                                readOnly
                                                rows={5}
                                                name="description"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา "
                                                required
                                            ></textarea>
                                        </div>


                                        <div className="col-span-6">
                                            <p className='text-[16px]'>ติดต่อ</p>
                                            <textarea
                                                value={dataOne?.contact}
                                                readOnly
                                                rows={5}
                                                name="description"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="ตัวอย่าง: ธุรกิจที่ให้บริการในรูปแบบไม่ได้ผลิตสินค้าขึ้นมา "
                                                required
                                            ></textarea>
                                        </div>





                                    </div>
                                </div>
                            </p>
                        </Modal>

                        <Table
                            style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                            scroll={{ x: '992px' }}
                            columns={columns}
                            rowKey='id'
                            dataSource={data}
                        />
                    </div>
                </>


            </div>




        </div >
    )
}
