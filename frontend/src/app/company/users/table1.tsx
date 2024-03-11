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
        setDataOne(daa.jobseeker)
        setId(daa.id)
        setOpen(true)
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleOk = async (status: string) => {
        try {
            const response = await fetchWithToken(`/job/company/recruit/urgent`, { method: "PATCH", body: JSON.stringify({ recruitid: id, type: status }) }, 0)
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


    const getLoca = (path: any) => {
        const test: any = getLocation(path)
        return `ตำบล${test[2].name_th}, อำเภอ${test[1].name_th}, จังหวัด${test[0].name_th}`
    }

    const vihecle = (test: any) => {
        return test.join(", ").replace("CAR", "รถยนต์").replace("MOTORCYCLE", "รถจักรยานยนต์").replace("TRUCK", "รถบรรทุก").replace("PICKUP_TRUCK", "รถกระบะ").replace("FORKLIFT", "รถฟอร์คลิฟท์")
    }


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
            <p className='text-[22px] text-gray-700 text-center font-semibold'>คนที่สมัครงานแบบด่วน</p>
            <br />
            <Table scroll={{ x: '992px' }} columns={columns} dataSource={data1} />

            <Modal
                open={open}
                onCancel={handleCancel}
                width={1000}
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
                    {dataOne.location ? (
                        <div className="bg-white mt-4 rounded-lg p-2 ">
                            <div className="flex justify-between">
                                <div className="">
                                    <p className='mb-4 text-[19px] text-[#2357A5] font-semibold'>ข้อมูลส่วนตัว</p>
                                    <div className="flex text-[16px] ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>ชื่อ</p>
                                            <p>{(dataOne.firstName)}</p>
                                        </div>

                                        <div className="flex ml-5">
                                            <p className='text-gray-500 mr-3'>นามสกุล</p>
                                            <p>{(dataOne.lastName)}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>ที่อยู่</p>
                                            <p>{dataOne.location.address}, {getLoca(dataOne.location)}</p>
                                            {/* <p>{JSON.stringify(dataOne.location)}</p> */}
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>อีเมล</p>
                                            <p>{("")}</p>
                                        </div>

                                        <div className="flex ml-5">
                                            <p className='text-gray-500 mr-3'>เบอร์</p>
                                            <p>{(dataOne.phonenumber)}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>วันเกิด</p>
                                            <p>{(dataOne.dob)}</p>
                                        </div>

                                        <div className="flex ml-5">
                                            <p className='text-gray-500 mr-3'>อายุ</p>
                                            <p>18 ปี</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>เพศ</p>
                                            <p>{(dataOne.gender === "MALE" ? "ชาย" : dataOne.gender === "FEMALE" ? "หญิง" : "อื่นๆ")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="w-[110px] h-[140px] mx-auto rounded-md border">
                                        {dataOne.image ? (
                                            <Image

                                                src={`${BASE_URL}/file/${dataOne.image}`}
                                                alt=""
                                                width={110}
                                                height={140}
                                            >
                                            </Image>
                                        ) : (<></>)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-6 ">
                                <div className="">
                                    <p className='mb-4 text-[19px] text-[#2357A5] font-semibold'>ความสามารถ</p>
                                    <div className="flex text-[16px] ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>พิมพ์ดีดไทย</p>
                                            <p>{dataOne.skill.th_typing} คำ/นาที</p>
                                        </div>

                                        <div className="flex ml-5">
                                            <p className='text-gray-500 mr-3'>พิมพ์ดีดอังกฤษ</p>
                                            <p>{dataOne.skill.eng_typing} คำ/นาที</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>ความสามารถในการขับขี่</p>
                                            <p>{vihecle(dataOne.skill.driving_ability)}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>มีพาหนะส่วนตัว</p>
                                            <p>{vihecle(dataOne.skill.private_vehicle)}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>ความสามารถพิเศษอื่นๆ *</p>
                                            <p>{dataOne.skill.other_special_skills}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>โครงการ ผลงานเกียรติประวัติและประสบการณ์อื่นๆ *</p>
                                            <p>{dataOne.skill.archievements}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-[17px] mt-3 ">
                                        <div className="flex mr-5">
                                            <p className='text-gray-500 mr-3'>บุคคลอ้างอิง *</p>
                                            <p>{dataOne.skill.references}</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : (<></>)}

                </p>
            </Modal>
        </div>
    )
}
