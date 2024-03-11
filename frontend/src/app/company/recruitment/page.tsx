"use client"

import fetchWithToken from '@/utils/fetchUtils';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default function Recruitment() {

    const tabllist = ["โพสต์งาน", "โพสต์ทั้งหมด", ""]
    const [tabs, setTabs] = useState<number>(0)
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
        how_to_apply: '',
        contact: '',
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


            if (status === "EDIT") {

                const salary = parseInt(dataOne?.salary || "0", 10);
                const employeeCount = parseInt(dataOne?.amount || "0", 10);
                const response = await fetchWithToken(`/job/company/${dataOne?.id}`, {
                    method: "PUT", body: JSON.stringify(
                        {
                            "title": dataOne?.title,
                            "type": dataOne?.jobType,
                            "salary": salary,
                            "employeeCount": employeeCount,
                            "description": dataOne?.detail,
                            "qualifications": dataOne?.qualification,
                            "how_to_apply": dataOne?.how_to_apply,
                            "contact": dataOne?.contact,
                        }
                    )
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                fetchData()
                await setOpen(false)
                await toast.success("เปลี่ยนสถานะเรียบร้อย")
            } else if (status === "DELETE") {
                const response = await fetchWithToken(`/job/company/${dataOne?.id}`, {
                    method: "DELETE"
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                fetchData()
                await setOpen(false)
                await toast.success("ลบโพสต์เรียบร้อย")
            }
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
            render: (_, record) => (
                <Space size="middle">

                    {record.status === "PENDING" ? (
                        <>
                            <p className='text-grey-500 text-bold'>กำลังตรวจสอบ</p>
                        </>
                    ) : record.status === "APPROVE" ? (
                        <>
                            <p className='text-green-500 text-bold'>อนุมัติโพสต์</p>
                        </>
                    ) : (
                        <>
                            <p className='text-red-500 text-bold'>ไม่อนุมัติโพสต์</p>
                        </>
                    )}
                </Space>
            ),
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
            const response = await fetchWithToken("/job/company", { method: "GET" }, 0)
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

    const submitpost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = formData
        data["salary"] = ~~data["salary"]
        data["employeeCount"] = ~~data["employeeCount"]
        try {
            const response = await fetchWithToken("/job/company", {
                method: 'POST',
                body: JSON.stringify(data),
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                throw new Error(test["message"]);
            }
            fetchData()

            await toast.success("เพิ่มโพสต์สำเร็จ")
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    return (
        <div>

            <p className='text-[25px] font-semibold'>ประกาศงาน</p>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">

                <ul className="flex bg-[#D9D9D9] rounded-lg px-4">
                    {tabllist.map((item, index) => (
                        <li
                            className='p-2'
                            key={index}
                            onClick={() => setTabs(index)}
                        >
                            <p className="opacity-[0.6]">{item}</p>
                        </li>
                    ))}
                </ul>


                {tabs === 0 ? (
                    <>
                        <form onSubmit={submitpost}>

                            <div className="grid md:grid-cols-12 grid-cols-1 gap-x-6 gap-y-8 my-6">
                                <div className="col-span-6">
                                    <p className='text-[16px]'>หัวข้องาน*</p>
                                    <input
                                        value={formData.title}
                                        onChange={handleChange}
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
                                        value={formData.type}
                                        onChange={handleChange}
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
                                        value={formData.salary}
                                        onChange={handleChange}
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
                                        value={formData.employeeCount}
                                        onChange={handleChange}
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
                                        value={formData.description}
                                        onChange={handleChange}
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
                                        value={formData.qualifications}
                                        onChange={handleChange}
                                        rows={5}
                                        name="qualifications"
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี ไม่จำกัดเพศ"
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-span-6">
                                    <p className='text-[16px]'>วิธีการสมัคร</p>
                                    <textarea
                                        value={formData.how_to_apply}
                                        onChange={handleChange}
                                        rows={5}
                                        name="how_to_apply"
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี ไม่จำกัดเพศ"
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-span-6">
                                    <p className='text-[16px]'>ติดต่อ</p>
                                    <textarea
                                        value={formData.contact}
                                        onChange={handleChange}
                                        rows={5}
                                        name="contact"
                                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี ไม่จำกัดเพศ"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button className=" bg-[#2357A5] font-bold text-white rounded-lg px-4 py-3 ">สร้างโพสต์</button>
                        </form>

                    </>
                ) : (
                    <>
                        <div className="mt-5">


                            <Modal
                                open={open}
                                onCancel={handleCancel}
                                width={1000}
                                title={"ข้อมูลโพสต์"}
                                style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }}
                                footer={[
                                    <Button key="back" type='primary' style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("EDIT")}>
                                        แก้ไขโพสต์
                                    </Button>,
                                    <Button key="submit" style={{ fontFamily: "__Noto_Sans_Thai_a5df19" }} onClick={() => handleOk("DELETE")}>
                                        ลบโพสต์
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
                                                    onChange={(e) => {
                                                        setDataone((prevData: any) => ({
                                                            ...prevData,
                                                            qualification: e.target.value
                                                        }));
                                                    }}
                                                    rows={5}
                                                    name="qualifications"
                                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี"
                                                    required
                                                ></textarea>

                                            </div>

                                            <div className="col-span-6">
                                                <p className='text-[16px]'>วิธีการสมัคร</p>

                                                <textarea
                                                    value={dataOne?.how_to_apply}
                                                    onChange={(e) => {
                                                        setDataone((prevData: any) => ({
                                                            ...prevData,
                                                            how_to_apply: e.target.value
                                                        }));
                                                    }}
                                                    rows={5}
                                                    name="how_to_apply"
                                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี"
                                                    required
                                                ></textarea>

                                            </div>


                                            <div className="col-span-6">
                                                <p className='text-[16px]'>ติดต่อ</p>

                                                <textarea
                                                    value={dataOne?.contact}
                                                    onChange={(e) => {
                                                        setDataone((prevData: any) => ({
                                                            ...prevData,
                                                            contact: e.target.value
                                                        }));
                                                    }}
                                                    rows={5}
                                                    name="contact"
                                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="ตัวอย่าง: 1. อายุไม่เกิน 30 ปี"
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
                )}


            </div>




        </div >
    )
}
